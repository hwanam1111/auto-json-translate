/* eslint-disable prefer-object-spread */
/* eslint-disable no-console */
/* eslint-disable no-return-await */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import Header from '../components/header';
import { deepTranslate } from '../utils/deep-translate';

const TranslateBlock = styled.section`
  display: flex;
  padding: 1rem;
  gap: 1rem;
`;

const EnteredCodeMirrorBlock = styled.div`
  width: 50%;
`;

const EnteredCodeMirror = styled(CodeMirror)`
  width: 100%;
  border: 1px solid #efefef;
  margin-top: 0.625rem;
`;

const ResultCodeMirrorBlock = styled.div`
  width: 50%;
`;

const ResultCodeMirror = styled(CodeMirror)`
  width: 100%;
  border: 1px solid #efefef;
  margin-top: 0.625rem;
`;

const TranslateButton = styled.button`
  border-radius: 0.25rem;
  text-align: center;
  width: 10rem;
  height: 2.5rem;
  font-size: 1rem;
  color: #fff;
  background-color: #ff9728;
  margin-top: 15rem;
  cursor: pointer;
`;

const ResultTitle = styled.p``;

function MainPage() {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [enteredJson, setEnteredJson] = useState<any>({});
  const [typeError, setTypeError] = useState<string>('');
  const [resultEnJson, setResultEnJson] = useState<object>({});
  const [resultDeJson, setResultDeJson] = useState<object>({});
  const [resultEsJson, setResultEsJson] = useState<object>({});
  const [resultFrJson, setResultFrJson] = useState<object>({});
  const [resultJaJson, setResultJaJson] = useState<object>({});

  const onChangeValue = useCallback((enteredValue: string) => {
    setEnteredValue(enteredValue);

    try {
      const parseJson = JSON.parse(enteredValue);
      setEnteredJson(parseJson);
      setTypeError('');
    } catch (err) {
      setTypeError('JSON 형식으로 입력해주세요.');
    }
  }, []);

  const onTranslate = useCallback(async () => {
    const copyEnteredJaJson = JSON.parse(JSON.stringify(enteredJson));
    const copyEnteredEnJson = JSON.parse(JSON.stringify(enteredJson));
    const copyEnteredEsJson = JSON.parse(JSON.stringify(enteredJson));
    const copyEnteredDeJson = JSON.parse(JSON.stringify(enteredJson));
    const copyEnteredFrJson = JSON.parse(JSON.stringify(enteredJson));
    const dtJa = await deepTranslate(copyEnteredJaJson, 'ja');
    const dtEn = await deepTranslate(copyEnteredEnJson, 'en');
    const dtEs = await deepTranslate(copyEnteredEsJson, 'es');
    const dtDe = await deepTranslate(copyEnteredDeJson, 'de');
    const dtFr = await deepTranslate(copyEnteredFrJson, 'fr');

    setResultEnJson(dtJa);
    setResultDeJson(dtEn);
    setResultEsJson(dtEs);
    setResultFrJson(dtDe);
    setResultJaJson(dtFr);
  }, [enteredJson]);

  // console.log('resultEnJson > ', JSON.stringify(resultEnJson));
  // console.log('resultDeJson > ', JSON.stringify(resultDeJson));
  // console.log('resultEsJson > ', JSON.stringify(resultEsJson));
  // console.log('resultFrJson > ', JSON.stringify(resultFrJson));
  // console.log('resultJaJson > ', JSON.stringify(resultJaJson));

  return (
    <div>
      <Header />
      <TranslateBlock>
        <EnteredCodeMirrorBlock>
          {typeError && <p>{typeError}</p>}
          <EnteredCodeMirror
            value={enteredValue}
            height="calc(100vh - 101px - 2rem)"
            extensions={[json()]}
            onChange={onChangeValue}
          />
        </EnteredCodeMirrorBlock>
        <TranslateButton type="button" onClick={onTranslate}>
          번역하기
        </TranslateButton>
        <ResultCodeMirrorBlock>
          {['en', 'es', 'fr', 'de', 'ja'].map((lang) => {
            let resultJson = resultEnJson;
            if (lang === 'es') resultJson = resultEsJson;
            if (lang === 'fr') resultJson = resultFrJson;
            if (lang === 'de') resultJson = resultDeJson;
            if (lang === 'ja') resultJson = resultJaJson;
            return (
              <div key={lang}>
                <ResultTitle>{lang}</ResultTitle>
                <ResultCodeMirror
                  value={JSON.stringify(resultJson, null, 2)}
                  lang="json"
                  height="calc(100vh - 101px - 2rem)"
                  readOnly
                  extensions={[json()]}
                />
              </div>
            );
          })}
        </ResultCodeMirrorBlock>
      </TranslateBlock>
    </div>
  );
}

export default MainPage;
