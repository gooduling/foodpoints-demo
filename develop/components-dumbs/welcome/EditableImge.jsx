import React from 'react';

class EditableImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: props.defaultImg || ''
        };
    }

    handleImageChange(e) {
        e.preventDefault();
        const { onChangeHandler } = this.props;
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
            onChangeHandler(reader.result)
        };
        reader.readAsDataURL(file)
    }

    render() {
        const { imagePreviewUrl } = this.state;
        return (
            <div className="editableImage" style={{'backgroundImage': `url(${imagePreviewUrl})`}}>
                <input type="file" onChange={(e)=>this.handleImageChange(e)} />
            </div>
        )
    }
}

EditableImage.propTypes = {
    onChangeHandler: React.PropTypes.func
};

export default EditableImage;     


