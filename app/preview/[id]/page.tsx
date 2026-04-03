export default async function Preview({params}){
  const html = await fetch(
    "http://localhost:3001/preview/"+params.id
  ).then(r=>r.text());

  return (
    <div dangerouslySetInnerHTML={{__html:html}} />
  );
}
