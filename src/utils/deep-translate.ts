/* eslint-disable no-return-await */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { TaskQueue } from 'cwait';
import { Promise as bluebirdPromise } from 'bluebird';
import axios from 'axios';
import qs from 'qs';

const MAX_SIMULTANEOUS_REQUEST = 100000;
const queue = new TaskQueue(bluebirdPromise, MAX_SIMULTANEOUS_REQUEST);

async function translate(translateLang: string, text: string) {
  const response = await axios({
    withCredentials: true,
    url: '/v1/papago/n2mt',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Naver-Client-Id': process.env
        .REACT_APP_NAVER_DEVELOPERS_CLIENT_ID as string,
      'X-Naver-Client-Secret': process.env
        .REACT_APP_NAVER_DEVELOPERS_CLIENT_SECRET as string,
    },
    data: qs.stringify({
      source: 'ko',
      target: translateLang,
      text,
    }),
  }).then((result) => {
    return result.data.message.result.translatedText;
  });

  return response;
}

export async function deepTranslate(
  copyObject: any,
  lang: string,
): Promise<Array<object>> {
  const has = Object.prototype.hasOwnProperty.bind(copyObject);
  const result = await Promise.all(
    Object.keys(copyObject)
      .reverse()
      .map(async (key) => {
        if (has(key)) {
          if (typeof copyObject[key] === 'string') {
            return queue.add(async () => {
              await translate(lang, copyObject[key]).then((result) => {
                copyObject[key] = result;
              });
              return copyObject;
            });
          }
          return await deepTranslate(copyObject[key], lang);
        }

        return false;
      }),
  );

  return result.filter((v) => {
    return !v?.length;
  });
}
