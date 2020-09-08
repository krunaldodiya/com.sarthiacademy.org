import {baseUrl} from './vars';

export function getMediaFile(media: string, file: string) {
  return `${baseUrl}/media/${media}?file=${file}`;
}
