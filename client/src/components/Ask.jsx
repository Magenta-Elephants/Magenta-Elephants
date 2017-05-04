import React from 'react';

const Ask = props => (
  <section className={"ask " + props.askDisplayClass}>
    <h1 className="headline" >Ask a Question</h1>
    <form>
      <div className="askTitle">
        <label>Title:</label>
        <input className="titleInput" type="text" placeholder="Insert Question Here"></input> <br/>
      </div>
      <div className="askBody">
        <textarea className="questionDescription"  placeholder="Paste Code Here"></textarea>
        <button type="submit">Ask</button>
      </div>
    </form>
  </section>
);

export default Ask;