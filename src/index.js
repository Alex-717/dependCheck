
import { get } from "lodash-es"
import axios from 'axios'
const obj = {
  a: 1,
  b: 2
}
console.log(get(obj, 'b'))