import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const KeyWord = ({x,handleChange}) => {

    const validateChange=(e)=>{
        return e.replace(/\s+/g, "-")
    }
  return (

    <div>
         <FormControl isRequired>
            <FormLabel color={"#add8e6"} m={"0"}>
              Key Word
            </FormLabel>
            <Input
              type="text"
              color={"black"}
              borderColor={"#add8e6"}
              value={x?.key_word}
              name="key_word"
              onChange={(e) => {
                validateChange(e.target.value)
                handleChange(e)
            }}
            />
          </FormControl>
          <br />
    </div>
  )
}

export default KeyWord