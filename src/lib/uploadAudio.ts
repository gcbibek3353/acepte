export async function uploadAudioFile(file: File, subdir = 'speaking-read-aloud'): Promise<string> {
  const formData = new FormData();
  formData.append('audio', file);
  formData.append('subdir', subdir);

  const uploadResponse = await fetch('/api/v1/s3/upload-audio', {
    method: 'POST',
    body: formData,
  });

  if (!uploadResponse.ok) {
    const errorBody = await uploadResponse.json().catch(() => null);
    const message =
      (errorBody && typeof errorBody.message === 'string'
        ? errorBody.message
        : uploadResponse.statusText) ||
      `Upload failed with status ${uploadResponse.status}`;
    throw new Error(message);
  }

  const uploadJson = await uploadResponse.json();
  if (!uploadJson.success || !uploadJson.audioUrl) {
    throw new Error(uploadJson.message || 'Upload response missing audioUrl');
  }

  return uploadJson.audioUrl;
}
