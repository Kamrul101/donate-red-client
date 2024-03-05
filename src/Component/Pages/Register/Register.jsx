import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
const imageHosting = import.meta.env.VITE_Img;
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Register = () => {
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${imageHosting}`;
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(imageHosting);
  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(image_hosting_url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image to ImgBB");
    }

    return response.json();
  };
  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0]);
  // const [state,setState] =  useState({
  //   name: '',
    
  // })
  const next =()=>{
    setFormNo(formNo+1);
  }
  const pre =()=>{
    setFormNo(formNo-1);
  }
  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.files[0];
    const password = form.password.value;
    const confirm = form.confirm.value;
    console.log(name, email, password, confirm, photo);
    if (password != confirm) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password didn't match",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    try {
      const imgbbResponse = await uploadImageToImgBB(photo);
      const imageUrl = imgbbResponse.data.url;

      createUser(email, password).then((result) => {
        const registeredUser = result.user;
        console.log(registeredUser);
        updateUserProfile(name, imageUrl).then(() => {
          const saveUser = { name: name, email: email, photo: imageUrl };
          console.log(saveUser);
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });

          navigate("/");
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    // <div className="card w-full md:w-1/3 md:mx-auto shadow-2xl bg-base-100 my-8">
    //     <div className="card-body">
    //     <h1 className="text-5xl font-bold">Sign Up</h1>
    //       <form onSubmit={handleRegister}>
    //           <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Name</span>
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Your name"
    //           name="name"
    //           className="input input-bordered"
    //         />
    //       </div>
    //           <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Email</span>
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Email"
    //           name="email"
    //           className="input input-bordered"
    //         />
    //       </div>
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Password</span>
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Password"
    //           name="password"
    //           className="input input-bordered"
    //         />

    //       </div>
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Confirm Password</span>
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Confirm Password"
    //           name="confirm"
    //           className="input input-bordered"
    //         />

    //       </div>
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Photo URL</span>
    //         </label>
    //         <input type="file"
    //         className="file-input file-input-bordered file-input-info w-full max-w-xs"
    //         name="photo" />

    //       </div>
    //       <div className="form-control mt-6">

    //         <input className="btn btn-primary" type="submit" value="Sign up" />
    //       </div>
    //       </form>
    //       <p className="my-4 text-center">Already have an account? <Link className="text-orange-600 text-bold" to='/login'>Login</Link></p>

    //     </div>
    //   </div>

    <>
      <div className="card w-full md:w-1/3 md:mx-auto shadow-2xl bg-base-100 my-8">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Sign Up</h1>
          {formNo === 1 && (
            <form>
              {/*Name*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  name="name"
                  className="input input-bordered"
                />
              </div>
              {/*email*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="input input-bordered"
                />
              </div>
              {/*pass*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  className="input input-bordered"
                />
              </div>
              {/*Confirm Pass*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="text"
                  placeholder="Confirm Password"
                  name="confirm"
                  className="input input-bordered"
                />
              </div>
              {/*Photo File*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-info w-full max-w-xs"
                  name="photo"
                />
              </div>
              <div className="flex justify-center mt-5">
                <button onClick={next} className="btn btn-danger bg-red-600 text-white hover:bg-white hover:text-black hover:border-red-600">
                  Next
                  <FaArrowRight />
                </button>
              </div>
            </form>
          )}
          {formNo === 2 && (
            <form>
              {/*Contact Number*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contact Number</span>
                </label>
                <input
                  type="text"
                  placeholder="+880XXXX-XXXXXX"
                  name="contact"
                  className="input input-bordered input-primary font-semibold"
                />
              </div>
              {/*Gender*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select name="gender" className="select select-primary w-full">
                  <option disabled selected>
                    Select Gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </div>
              {/*Blood group*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Blood Group</span>
                </label>
                <select className="select select-primary w-full">
                  <option disabled selected>
                    Select Blood Group
                  </option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>
              {/* date of birth */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Date of birth
                  </span>
                </label>
                <input
                  type="date"
                  name="date"
                  className="input input-bordered border-primary font-semibold"
                />
              </div>
              {/*Navigation*/}
              <div className="flex justify-between mt-5">
                <button onClick={pre} className="btn btn-danger bg-red-600 text-white hover:bg-white hover:text-black hover:border-red-600">
                  <FaArrowLeft />
                  Previous
                </button>
                <button onClick={next} className="btn btn-danger bg-red-600 text-white hover:bg-white hover:text-black hover:border-red-600 ">
                  Next
                  <FaArrowRight />
                </button>
              </div>
            </form>
          )}
          {formNo === 3 && (
            <form>
              {/*District*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">District</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Current District"
                  name="district"
                  className="input input-bordered input-primary font-semibold"
                />
              </div>
              {/*Thana*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Thana</span>
                </label>
                <select name="gender" className="select select-primary w-full">
                  <option disabled selected>
                    Select Thana
                  </option>
                  <option>Ramna Model Thana (রমনা থানা)</option>
                  <option>Motijheel Thana (মতিঝিল থানা)</option>
                  <option>Dhanmondi Thana (ধানমন্ডি থানা)</option>
                  <option>Mirpur Thana (মিরপুর থানা)</option>
                  <option>Pallabi Thana (পল্লবী থানা)</option>
                  <option>Kafrul Thana (কাফরুল থানা)</option>
                </select>
              </div>
              {/* Last of Donating blood */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Last of Donation
                  </span>
                </label>
                <input
                  type="date"
                  name="date"
                  className="input input-bordered border-primary font-semibold"
                />
                <p className="text-justify text-red-600"><span>*Note: </span>If you haven't given yet, just select <br />minimum 3 month before from todays date </p>
              </div>
              {/*Blood related problem*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Any issue related to donation</span>
                </label>
                <textarea className="textarea textarea-primary" placeholder="Bio" name="issue"></textarea>
              </div>
              
              {/*Navigation*/}
              <div className="flex justify-between mt-5">
                <button onClick={pre} className="btn btn-danger bg-red-600 text-white hover:bg-white hover:text-black hover:border-red-600">
                  <FaArrowLeft />
                  Previous
                </button>
                <button className="btn btn-danger bg-green-600 text-white hover:bg-white hover:text-black hover:border-red-600 ">
                  Submit
                  
                </button>
              </div>
            </form>
          )}
          <p className="my-4 text-center">
            Already have an account?{" "}
            <Link className="text-orange-600 text-bold" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
