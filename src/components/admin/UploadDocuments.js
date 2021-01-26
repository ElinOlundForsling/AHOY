import React, { useState } from 'react';
import Card from '../layout/Card';
import { uploadDocuments } from '../../store/actions/profileActions';
import { connect } from 'react-redux';
import '../../stylesheets/documents.css';
import '../../stylesheets/form.css';
import Button from '../layout/Button';

const UploadDocuments = ({ uploadDocuments, auth, profile }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  function handleChange(e) {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  function handleUpload(e) {
    e.preventDefault();
    uploadDocuments(auth.uid, profile, file);
    setFileName('');
    setFile(null);
  }

  function fileNameRegex(file) {
    let documentName = file.replace(/[\s\S]*%2F/, '');
    documentName = documentName.replace(/(\?)[\s\S]+/, '');
    documentName = documentName.replace(/(%20)/g, ' ');
    return documentName;
  }

  return (
    <section className='section-form'>
      {profile.documents && (
        <>
          <form onSubmit={handleUpload} className='profile-form'>
            <div className='file-upload-wrapper' data-text='Select your file!'>
              <input
                name='file-upload-field'
                type='file'
                className='file-upload-field'
                onChange={handleChange}
                value=''
              />
            </div>
            <br></br>
            <div>{fileName}</div>
            <Button size='small' className='button' disabled={!file}>
              upload
            </Button>
          </form>
          <div className='documents-list'>
            <h3>Uploaded documents</h3>
            {profile.documents.map(document => {
              return (
                <div className='documents-links' key={document}>
                  {' '}
                  <a href={document} target='_blank'>
                    {fileNameRegex(document)}
                  </a>{' '}
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadDocuments: (auth, profile, file) =>
      dispatch(uploadDocuments(auth, profile, file)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadDocuments);
