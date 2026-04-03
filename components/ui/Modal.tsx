export default function Modal({ children, close }: any) {
  return (
    <div style={backdrop} onClick={close}>
      <div style={box} onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

const backdrop={position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:100};
const box={background:"#020712",padding:40,borderRadius:20,maxWidth:500,margin:"100px auto"};
