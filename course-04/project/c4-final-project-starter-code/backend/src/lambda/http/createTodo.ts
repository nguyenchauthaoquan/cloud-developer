import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import {createTodo} from "../../helpers/businessLogic/todo/todos";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const newTodo: CreateTodoRequest = JSON.parse(event.body)
      // TODO: Implement creating a new TODO item
      const userId = getUserId(event)
      const items = await createTodo(userId, newTodo)

      return {
          statusCode: 200,
          body: JSON.stringify({
              items
          })
      }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
