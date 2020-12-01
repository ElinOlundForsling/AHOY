import React, { useState } from "react";
import Card from "../layout/Card";
import {
  getProfileSuccess,
  uploadDocuments,
} from "../../store/actions/profileActions";
import { connect } from "react-redux";
import { FiFolderPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import '../../stylesheets/documents.css'

const Documents = ({ uploadDocuments, auth, profile }) => {
  const [file, setFile] = useState(null);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();

    uploadDocuments(auth.uid, profile, file);
  }

  function fileNameRegex(file) {
    let documentName = file.replace(/[\s\S]*%2F/, '')
    documentName = documentName.replace(/(\?)[\s\S]+/, '')
    documentName = documentName.replace(/(%20)/g, ' ')
    return documentName
  }


  console.log("PROFILE", profile);
  return (
    <Card
      heading="Document Uploads"
      subHeading="View your documents here"
      className="documents-component"
    >
      {profile.documents && (
        <>
          <div>
            <label htmlFor="file"></label>
            <form onSubmit={handleUpload}>
              <div
                className="file-upload-wrapper"
                data-text="Select your file!"
              >
                <input
                  name="file-upload-field"
                  type="file"
                  className="file-upload-field"
                  onChange={handleChange}
                  value=""
                />
              </div>
              <br></br>
              <button disabled={!file}>upload</button>
            </form>
          </div>
          <div>
            {profile.documents.map((document) => {
              return (
                <div>
                  {" "}
                  <a href={document} target="_blank">
                    {fileNameRegex(document)}
                  </a>{" "}
                </div>
              );
            })}
          </div>
        </>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadDocuments: (auth, profile, file) =>
      dispatch(uploadDocuments(auth, profile, file)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Documents);
