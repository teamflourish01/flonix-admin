import React from 'react'
import getSlug from 'speakingurl';

const generateSlug = (text) => {
    return getSlug(text, {
        separator: '-', // This ensures that spaces are replaced with hyphens
      });
    
  
}

export default generateSlug
