import { MODEL_ID, getRequestOptions } from '../utils/clarifai.ts';

export const processImage = async (imageData: string) => {
  const rawResponse = await fetch(
    `https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`,
    getRequestOptions(imageData),
  );
  const res = await rawResponse.json();

  // TODO: Set response status to 400
  if (res.status.code === 30002) throw new Error('Invalid image URL detected');

  return res.outputs[0].data.regions;
};
