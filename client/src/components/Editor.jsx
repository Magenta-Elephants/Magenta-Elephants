import React from 'react';
import TinyMCE from 'react-tinymce';


class Editor extends React.Component {
  constructor() {
    super();
    this.state = { editor: null };
  }
  componentDidMount() {
    tinymce.init({
      selector: `#${this.props.id}`,
      plugins: 'codesample',
      codesample_languages: [
        {text: 'HTML/XML', value: 'markup'},
        {text: 'JavaScript', value: 'javascript'},
        {text: 'CSS', value: 'css'},
        {text: 'PHP', value: 'php'},
        {text: 'Ruby', value: 'ruby'},
        {text: 'Python', value: 'python'},
        {text: 'Java', value: 'java'},
        {text: 'C', value: 'c'},
        {text: 'C#', value: 'csharp'},
        {text: 'C++', value: 'cpp'}
        ],
      toolbar: 'undo redo | styleselect | bold italic | codesample',
      branding: false,
      menubar: false,
      statusbar: false,
      setup: editor => {
        this.setState({ editor });
        editor.on('keyup change', () => {
          const content = editor.getContent();
          this.props.onEditorChange(content);
        });
      }
    });
  }

  componentWillUnmount() {
    tinymce.remove(this.state.editor);
  }

  render() {
    return (
      <textarea
        id={this.props.id}
        value={this.props.content}
        onChange={e => console.log(e)}
      />
    );
  }
}

export default Editor;
