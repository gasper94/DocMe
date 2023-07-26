 import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { Configuration, OpenAIApi } from 'openai';

function GenerateCV({ editedContent }) {
  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI,
  });

  const openai = new OpenAIApi(configuration);

  const promptPrefix = `
        I'll provide a description please extract the following information:  "origin point A", "destination point B", "number of calories", "mood", and "drank water" . You should return an object like this:  {
        pointA: "El Salvador",
        pointB: "San Francisco, USA",
        calories: 350,
        mood: happy,
        drankWater: true,
        } My sentence: "Today I went from a walk from San Francisco California, USA to El Salvador. I burned 350 calories and drank water. Overall, I feel happy and unstressed." Just return the object as code and don’t say anything.
    `;

  const [text, setText] = useState('hello, what day is today?');
  const [showContent, setShowContent] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  function splitInput(input, chunkSize) {
    const chunks = [];
    let i = 0;
    while (i < input.length) {
      chunks.push(input.slice(i, i + chunkSize));
      i += chunkSize;
    }
    return chunks;
  }

  const handleButtonClick = async () => {
    const inputChunks = splitInput(promptPrefix, 3000);
    let prompt = '';
    let response = '';

    for (let i = 0; i < inputChunks.length; i++) {
      const chunk = inputChunks[i];
      prompt = promptPrefix + chunk + '\nBot: ' + response;

      const result = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.5,
        max_tokens: 1024,
      });

      response += result.data.choices[0].text;
    }

    console.log('Response:', response);
    setApiResponse(response);
    setShowContent(true);
  };

  return (
    <View>
      <Button title="Generate Question" color="green" onPress={handleButtonClick} />
      {showContent && (
        <View>
          <Text>Generated Question:</Text>
          <Text>{apiResponse}</Text>
        </View>
      )}
    </View>
  );
}

export default GenerateCV;
