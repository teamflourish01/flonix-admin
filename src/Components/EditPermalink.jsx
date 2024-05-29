import React, { useEffect, useState } from "react";
import generateSlug from "../util/generateSlug";
import axios from "axios";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import getSlug from "speakingurl";

const EditPermalink = ({slug,setSlug,folder }) => {
  // const [title, setTitle] = useState("");
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const url=process.env.REACT_APP_DEV_URL

  const handleSlugChange = (e) => {
    setSlug(e.target.value);
  };


  // const handleSubmit = (e) => {
  //   let formData=new FormData()
  //   formData.append("dup",JSON.stringify({...blog,slug}))
  //   e.preventDefault();
  //   axios.post(`${url}/blog/edit/${postId}`,formData)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       alert(data.message);
  //     })
  //     .catch((error) => {
  //       // setError(error);
  //     });
  // };


  return (
    <form >
    {/* <FormControl>
      <FormLabel>
        Title
        <Input type="text" value={title} onChange={handleTitleChange} />
      </FormLabel>
    </FormControl>
      <br /> */}
      <FormControl>
      <FormLabel>
        Permalink
        <Input isDisabled={true} value={url+"/"+folder+"/"+getSlug(slug)} />
        <Input type="text" value={slug} onChange={handleSlugChange} />
      </FormLabel>
      </FormControl>
      {/* <Button type="submit">Update Permalink</Button> */}
    </form>
  );
};

export default EditPermalink;
