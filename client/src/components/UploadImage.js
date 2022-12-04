import React from "react";
import ReactAvatarEditor from "react-avatar-editor";

class UploadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            allowZoomOut: false,
            position: { x: 0.5, y: 0.5 },
            scale: 1,
            rotate: 0,
            borderRadius: 50,
            preview: null,
            width: 130,
            height: 130,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleNewImage = (e) => {
        this.setState({ image: e.target.files[0] });
    };
    handleScale = (e) => {
        const scale = parseFloat(e.target.value);
        this.setState({ scale });
    };
    handlePositionChange = (position) => {
        this.setState({ position });
    };
    setEditorRef = (editor) => (this.editor = editor);

    async handleSubmit(e) {
        if (this.editor) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            const img = this.editor.getImageScaledToCanvas().toDataURL();
            const userId = parseInt(localStorage.getItem('user_Id'));
            // fetch("http://127.0.0.1:8080/api/add-image", {
                fetch("http://127.0.0.1:8080/api/add-image", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: img, userId: userId})
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    this.props.history.push('/profile')
                    console.log("did", result)
                } else {
                    console.log("error", result.message)
                }
            }).then(fetch(`http://127.0.0.1:8080/api/update-user/${userId}`, {
                method: 'PUT'
              }).then(response => response.json()))
        }
    }
    render() {
        return (
            <div>
                <div>
                    <ReactAvatarEditor
                        ref={this.setEditorRef}
                        scale={parseFloat(this.state.scale)}
                        width={this.state.width}
                        height={this.state.height}
                        position={this.state.position}
                        onPositionChange={this.handlePositionChange}
                        rotate={parseFloat(this.state.rotate)}
                        borderRadius={this.state.width / (100 / this.state.borderRadius)}
                        image={this.state.image}
                        color={[255, 255, 255, 0.6]}
                        className="editor-canvas"
                    />
                </div>
                <br />
                <label>
                    <input
                        name="upload-img-input"
                        type="file"
                        onChange={this.handleNewImage}
                    />
                    <h3 className="yellow" >Upload Photo</h3>
                </label>
                <br />
                <h3 className="yellow">Zoom</h3>
                <input
                    name="scale"
                    type="range"
                    onChange={this.handleScale}
                    min={this.state.allowZoomOut ? "0.1" : "1"}
                    max="2"
                    step="0.01"
                    defaultValue="1"
                />
                <div>
                    <button onClick={this.handleSubmit}>
                        SUBMIT
                    </button>
                </div>
            </div>
        )
    }
}
export default UploadImage;