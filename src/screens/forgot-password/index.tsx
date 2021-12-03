import React, { useEffect, useState } from 'react';

interface ForgotPasswordProps {

}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  
  const [content, setContent] = useState("");

  useEffect(() => {
    const contents = [
      "Li4uLi4uLi4uLi4uLi4uLi4uLi4uLi8nPy8pIA==",
      "Li4uLi4uLi4uLi4uLi4uLi4uLi4sLz8uLi8g",
      "Li4uLi4uLi4uLi4uLi4uLi4uLi8uLi4uLyA=",
      "Li4uLi4uLi4uLi4uLi8nPy8nLi4uJy8nPz9gLiwg",
      "Li4uLi4uLi4uLi8nLy4uLi8uLi4uLy4uLi4uLi4vPz9cIA==",
      "Li4uLi4uLi4oJyhVIFIgVEhFIEFETUlOIExPTC4uLicpIA==",
      "Li4uLi4uLi4uXC4uLi4uLi4uLi4uLi4uLi4uJy4uLi4uLyA=",
      "Li4uLi4uLi4uLicnLkRPIFNPTUVUSElORy4gXy4uJyA=",
      "Li4uLi4uLi4uLi4uXC4uLi4uLi4uLi4uLi4uKCA=",
      "Li4uLi4uLi4uLi4uLi5cLi4uLi4uLi4uLi4uLlwuLi4=",
    ]

    const show = (ind: number, contents: Array<string>) => {
      if (ind >= contents.length) {
        return;
      }
      setContent(prevValue => prevValue + "\n" + atob(contents[ind]));
      setTimeout(() => show(ind + 1, contents), 500);
    };
    show(0, contents);
  }, [])

  return (
    <pre>
      {content}
    </pre>
  )
}

export default ForgotPassword;