// Client for the AtlasVision API, called through the same-origin Vite proxy
// (/api/atlas/*) so the browser never talks to the upstream directly and the
// API key never leaves the dev server. See vite.config.js.

const API_BASE = '/api/atlas';
const CLIENT_TIMEOUT_MS = 600_000; // first call after idle can take minutes

const STATUS_HINTS = {
  400: 'The request was rejected — check the image and the language code.',
  401: 'The API key is missing or invalid. Set ATLAS_API_KEY in .env.local and restart the dev server.',
  413: 'The image is over 10 MB or the text is over 4000 characters.',
  422: 'A required field is missing or has the wrong type.',
  500: 'The model reported an error. Try once more, then report it to the API owner.',
};

async function parseResponse(res) {
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* upstream returned a non-JSON body */
  }
  if (!res.ok) {
    const detail = data && data.detail ? String(data.detail) : `Request failed (${res.status})`;
    const err = new Error(STATUS_HINTS[res.status] ? `${detail} — ${STATUS_HINTS[res.status]}` : detail);
    err.status = res.status;
    throw err;
  }
  return data || {};
}

async function postForm(path, fields, imageFile) {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null && value !== '') {
      form.append(key, String(value));
    }
  }
  if (imageFile) form.append('image', imageFile, imageFile.name || 'image.jpg');

  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    body: form,
    signal: AbortSignal.timeout(CLIENT_TIMEOUT_MS),
  });
  return parseResponse(res);
}

/** POST /chat when a question is given, POST /describe when it is not. */
export function askAboutImage(imageFile, question, lang) {
  if (question && question.trim()) {
    return postForm('/chat', { question: question.trim(), lang }, imageFile);
  }
  return postForm('/describe', { lang, detailed: 'true' }, imageFile);
}

/** POST /text — text-only prompt, no image. */
export function askText(prompt) {
  return postForm('/text', { prompt: prompt.trim() });
}

/** Turn a data URL, object URL or bundled asset URL into an uploadable File. */
export async function toImageFile(src) {
  const res = await fetch(src);
  const blob = await res.blob();
  const ext = (blob.type.split('/')[1] || 'jpeg').replace('jpg', 'jpeg');
  return new File([blob], `playground-image.${ext}`, { type: blob.type || 'image/jpeg' });
}
