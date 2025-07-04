function facerecognition(){
  return(
    <>
    <h1>Face Recognition </h1>

    <form>
      <input type="text" name="name" className="border-2"/>
      <input type="file"  alt="image" className="border-2" />
      <button type="submit"className="border-2" >Sumbit</button>
    </form>
    </>
  )
}

export default facerecognition;