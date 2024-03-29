import React from "react";
import ReactAvatarEditor from "react-avatar-editor";
import Cookies from 'js-cookie';
import { addImagePopup } from '../utils/utils';
import { MdClose } from "react-icons/md";
import History from "../store/History";

class UploadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            position: { x: 0.5, y: 0.5 },
            scale: 1,
            rotate: 0,
            borderRadius: 50,
            preview: null,
            width: 150,
            height: 150,
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
        if (this.editor.state.image.resource) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            const img = this.editor.getImageScaledToCanvas().toDataURL();
            const userId = Cookies.get('user_Id');
            fetch("/api/add-image", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: img, userId: userId })
            }).then(response => response.json())
                .then(result => {
                    if (result.success) {
                        let url = encodeURIComponent(result.url)
                        Cookies.set('profile_pic', result.url)
                        fetch(`/api/update-user/${userId}/${url}`, {
                            method: 'PUT'
                        })
                    }
                }).then(result => {
                    addImagePopup()
                    this.props.reset ? this.props.setReset(false) : this.props.setReset(true)
                    History.push('/profile')
                })
        }else{
            window.alert("Please choose a valid image")
        }
    }
    render() {
        return (
            <div className="image form">
                <MdClose className='add-post-close' onClick={addImagePopup} />
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
                <span className="underline" >Upload Photo</span>
                
                    <input
                        name="upload-img-input"
                        className="upload-img-input"
                        type="file"
                        onChange={this.handleNewImage}
                    />
            
               
                <span className="yellow">Zoom</span>
                <input
                    name="scale"
                    type="range"
                    onChange={this.handleScale}
                    min="1"
                    max="5"
                    step=".25"
                    defaultValue="1"
                />
                <div>
                    <button className="submit btn" onClick={this.handleSubmit}>
                        SUBMIT
                    </button>
                </div>
            </div>
        )
    }
}
export default UploadImage;