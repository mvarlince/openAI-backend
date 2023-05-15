import { Configuration, OpenAIApi } from "openai"
import { apiKey } from "./secrets.js"

const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration)

export const getAnalysis = async (req, res) => {
  const {userInput} = req.body
  console.log(`userInput: ${userInput}`)

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    // prompt: generatePrompt(userInput),
    prompt: `return postive, negative or neutral sentiment analysis of: ${userInput}`,
    temperature: 1,
  })
  //   const sentiment = response.data
  console.log(response.data)
  res.send(response.data)
}
