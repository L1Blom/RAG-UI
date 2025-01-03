import React, { useState, useContext} from "react";
import { SettingsContext } from "../components/SettingsContext";

function Upload() {
  const { settings }  = useContext(SettingsContext);
  const [data, setData] = useState("Choose file to upload");
  
  const handleFileSubmit = (e) => {
    e.preventDefault();
    setData("Uploading file...")
    const formData = new FormData(e.target);
    let api = `${settings.PROD_API}/prompt/${settings.Project}/upload`

    // Send formData to your server using an HTTP request (e.g., axios or fetch).
    // Replace 'YOUR_UPLOAD_API_ENDPOINT' with your actual API endpoint.
    fetch(`${api}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        // Handle the response from the server.
        console.log(data);
        setData(data)
      })
      .catch((error) => {
        console.error("Error uploading the file:", error);
      });
  };

  return (
    <td>
        <form encType="multipart/form-data" onSubmit={handleFileSubmit}>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              {data}
            </label> 
            <input
              name="file"
              className="form-control"
              type="file"
              id="formFile"
            />
          </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
        </form>
    </td>
  );
}

export default Upload;