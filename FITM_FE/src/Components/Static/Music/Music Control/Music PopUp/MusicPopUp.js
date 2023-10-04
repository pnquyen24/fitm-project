function MusicPopup ({editMusic, setEditMusic}){
    const handleEditClick = () => {
        setEditMusic(false);
      };
    
    return (
        <div className="fixed-cmn">
        <div className="blur-ms"
        onClick={handleEditClick}></div>

        <div className="edit-ms-form">
          <input type="text" className="ms-id"></input>

          <div className="ms-name ms-info">
            <div className="ms-icon">
              <ion-icon name="musical-notes-outline"></ion-icon>
            </div>
            <input type="text" value="Music Name"></input>
          </div>

          <div className="ms-author ms-info">
            <div className="ms-icon">
              <ion-icon name="person-circle-outline"></ion-icon>
            </div>
            <input type="text" value="Music Author"></input>
          </div>

          <div className="ms-beat ms-info">
            <div className="ms-icon">
              <ion-icon name="disc-outline"></ion-icon>
            </div>
            <input type="text" value="Link beat"></input>
          </div>

          <div className="ms-sheet ms-info">
            <div className="ms-icon">
              <ion-icon name="documents-outline"></ion-icon>
            </div>
            <input type="text" value="Link doc"></input>
          </div>

          <div className="ms-btn">
            <button className="ms-update">
              {" "}
              <ion-icon name="cloud-upload-outline"></ion-icon> Update{" "}
            </button>
            <button className="ms-delete">
              {" "}
              <ion-icon name="close-circle-outline"></ion-icon> Delete{" "}
            </button>
          </div>
        </div>
      </div>
    )
}
export default MusicPopup;