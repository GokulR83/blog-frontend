import React, { useState } from 'react'
import DynamicForm from '../component/DynamicForm';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import RedirectLogIn from '../component/RedirectLogIn';
import Cookies from 'js-cookie';
import { url } from '../utils/constants';
import toast, { Toaster } from 'react-hot-toast';
import ButtonLoading from '../shimmer/ButtonLoading';

const CreateBlog = () => {
  const [file, setFile ] = useState();
  const [image, setImage ] = useState();
  const[ loading, setLoading ] = useState(false);
  const { userId } = useParams();
  const cookieUser = Cookies.get('user');
  const [ formDatae, setFormDatae ] = useState({title:null,summary:null,content:[]});
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleImageChange = (e) =>{
    setFile(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    // setFormData({...formData, image :URL.createObjectURL(e.target.files[0])});
  }
  const handleChangeInFormData = (e) => {
    setFormDatae({...formDatae , [e.target.name] : e.target.value});
  }
  const handleSubmit = async() =>{
    // console.log(image);
    setLoading(true);
      let formData = new FormData();
      const { title, summary, content } = formDatae;
      if(!title || !summary || content.length === 0){
        toast.error("Fill the all Required Field");
        return;
      }
      formData.append("blogData",`${JSON.stringify(formDatae)}`);
      formData.append("blogPicture",image);
      try {
        const response = await fetch(`https://blog-backend-ts9b.onrender.com/api/blog/create/${userId}`,{
          method:"POST",
          body: formData,
      })
      const data =await response.json();
      if(data?.error)
        toast.error(data.error);
      else{
        toast.success("Post Created Successfully");
        navigate(`/blog/${data.post._id}`);
      }
      } catch (error) {
        console.log(error);
      }
  }
  return !cookieUser ?(
      <RedirectLogIn />
  ):(
    <div className='absolute w-[100%] min-h-full h-fit flex items-center flex-col bg-[#252526] -z-10 text-white font-primary'>
      <div className="flex flex-wrap flex-col  md:flex-nowrap justify-center items-center gap-10 mt-32 w-[80%]">
        <div className='flex justify-center flex-col items-center'>
          <h1 className='font-2xl font-bold font-secondary'>Write Anything On your mind</h1>
          <h1 className='font-2xl font-bold font-third'>Let the world, Read your Wisdom</h1>
        </div>
        <form className='w-full' onSubmit={(e)=> e.preventDefault()}>
          <div>
            <label className="text-white  mb-2">Title</label>
            <input type="text"
            className="w-full p-2 mb-4 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            name='title'
            value={formDatae.title}
            onChange={(e) =>handleChangeInFormData(e)}
            />
          </div>
          <div>
            <label className="text-white  mb-2">Summary / Short Description</label>
            <textarea
            name="summary"
            className="w-full p-2 mb-4 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="3"
            value={formDatae.summary}
            onChange={(e) =>handleChangeInFormData(e)}
          ></textarea>
          </div>
          <div>
            <label className="text-white mb-2">Add image</label>
            <label
              htmlFor="imageInput"
              className="cursor-pointer border border-gray-600 rounded-lg w-full min-h-36 h-full text-center flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-colors relative"
      >
        {file ? (
          <img
            src={file}
            alt="Uploaded"
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <span className="text-purple-400 w-full">Add Image +</span>
        )}
        <input
          id="imageInput"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
          </div>
          <div className='mt-4'>
            <DynamicForm formData = {formDatae} setFormData={setFormDatae} />
          </div>
          <Toaster
          position="top-right"
          reverseOrder={true}
          />
          <button className='w-full my-10 text-center px-6 py-2 bg-[#624CAB] rounded-lg'
            onClick={handleSubmit}
          >
          {
              loading ? (<div className='flex flex-row gap-4 items-center justify-center'>
                <p>Publishing</p>
                <ButtonLoading />
                </div>) : ("Publish Your Blog")
            }
          </button>
        </form>
      </div>
  </div>
  )
}

export default CreateBlog