import { useAtom } from 'jotai';
import { contentAtom, contentArrAtom, oneCountAtom } from '../state/atoms';
import downArrow from '../assets/icons/arrow-down.png';

function InputForm() {
  const [content, setContent] = useAtom(contentAtom);
  const [, setContentArr] = useAtom(contentArrAtom);
  const [, setOneCount] = useAtom(oneCountAtom);

  //timestamp
  // From X to Everyone
  //Eliminate direct messages
  //Reacted to
  // Replying to
  // \n is return \t is tab

  function parseContent() {
    const textArray = content.split('\n');
    //get rid of timestamp
    let ones = 0;
    const trimmedArray = textArray.map((el) => {
      const pattern = /^\d/;
      const splitter = el.indexOf('F');
      if (pattern.test(el)) el = el.slice(splitter + 5);
      if (el.includes('to Everyone')) el = el.replace(' to Everyone', '');
      if (el.includes('1')) ones++;
      // console.log(el)
      return el.replace('\t', '');
    });
    setOneCount(ones);
    let finalArray = trimmedArray.map((el, i, arr) => {
      if (i % 2 === 0) return arr[i] + ' ' + arr[i + 1];
      return null;
    });
    let finalFinalArray = [];
    for (let i = 0; i < finalArray.length; i++) {
      if (finalArray[i] != null) {
        const newProduct = <li key={i}>{finalArray[i]}</li>;
        finalFinalArray.push(newProduct);
      }
    }

    setContentArr(finalFinalArray);
  }

  return (
    <div className="side inputForm">
      <div style={{display: "flex", flexDirection: "column", gap: ".5rem", alignItems: "center"}}>
        <h3>Paste chat here</h3>
        <img style={{ height: '40px' }} src={downArrow} alt="here" />
      </div>

      <textarea
        className="textArea"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <section className="inputMenu">
        {/* <label className="menu-item">
            <input type="checkbox" />
            <span>timestamp</span>
          </label> */}
      </section>
      <button className="cta" onClick={() => parseContent()}>
        Submit
      </button>
    </div>
  );
}

export default InputForm;
