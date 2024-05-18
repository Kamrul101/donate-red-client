import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
const imageHosting = import.meta.env.VITE_Img;
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import toggle from '../Login/toggle.css'

const Register = () => {
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${imageHosting}`;
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

   const togglePasswordVisibility = () => {
     setShowPassword(!showPassword);
   };
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: null,
    password: "",
    confirm: "",
    contact: "",
    gender: "",
    group: "",
    date: "",
    district: "",
    thana: "",
    lastDate: "",
    issue: "",
  });
  const next = () => {
    if (
      formNo === 1 &&
      formData.name &&
      formData.email &&
      formData.photo &&
      formData.password &&
      formData.confirm
    ) {
      setFormNo(formNo + 1);
    } else if (
      formNo === 2 &&
      formData.contact &&
      formData.gender &&
      formData.group &&
      formData.date
    ) {
      setFormNo(formNo + 1);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Fill up all the input",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const pre = () => {
    setFormNo(formNo - 1);
  };
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };
  const handleRegister = async (event) => {
    event.preventDefault();
   
    const {
      name,
      email,
      photo,
      contact,
      gender,
      group,
      date,
      district,
      thana,
      lastDate,
      issue,
      password,
    } = formData;

    if (formData.password != formData.confirm) {
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
        
        updateUserProfile(name, imageUrl).then(() => {
          const saveUser = {
            name: name,
            email: email,
            photo: imageUrl,
            contact: contact,
            gender: gender,
            group: group,
            date: date,
            district: district,
            thana: thana,
            lastDate: lastDate,
            issue: issue,
          };
          
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

          navigate("/UserProfile");
          window.location.reload();
          
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="card w-full md:w-1/3 md:mx-auto shadow-2xl bg-base-100 my-8">
        <div className="card-body !border-red-500">
          <div className="flex justify-center">
            <ul className="steps w-full">
              {formArray.map((v, i) => (
                <li
                  key={i}
                  className={`step ${
                    formNo - 1 === i ||
                    formNo - 1 === i + 1 ||
                    formNo === formArray.length
                      ? "step-error"
                      : "step"
                  } `}
                ></li>
              ))}
            </ul>
          </div>
          <h1 className="text-5xl font-bold">Sign Up</h1>
          <form onSubmit={handleRegister}>
            {formNo === 1 && (
              <div>
                {/*Name*/}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    name="name"
                    className="input input-bordered"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {/*email*/}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Email"
                    name="email"
                    className="input input-bordered"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {/*pass*/}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Password"
                    name="password"
                    className="input input-bordered"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {/*Confirm Pass*/}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Confirm Password"
                    name="confirm"
                    className="input input-bordered"
                    value={formData.confirm}
                    onChange={handleChange}
                  />
                </div>
                <div className="password-toggle">
              <label className="cursor-pointer password-toggle-label">
        <input
          type="checkbox"
          checked={showPassword}
          className="checkbox-primary"
          onChange={togglePasswordVisibility}
        />
        <span className="label-text ml-2 font-semibold">{showPassword ? 'Hide' : 'Show'} Password</span>
      </label>
            </div>
                {/*Photo File*/}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-info w-full"
                    name="photo"
                    // value={formData.photo}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-center mt-5">
                  <button
                    onClick={next}
                    className="btn btn-danger w-full bg-red-600 text-white hover:bg-white hover:text-black hover:border-red-600"
                  >
                    Next
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            )}
            {formNo === 2 && (
              <div>
                {/*Contact Number*/}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Contact Number</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+880XXXX-XXXXXX"
                    name="contact"
                    className="input input-bordered input-primary font-semibold"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </div>
                {/*Gender*/}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Gender</span>
                  </label>
                  <select
                    name="gender"
                    className="select select-primary w-full"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                {/*Blood group*/}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Blood Group</span>
                  </label>
                  <select
                    name="group"
                    className="select select-primary w-full"
                    value={formData.group}
                    onChange={handleChange}
                  >
                    <option>Select Blood Group</option>
                    <option value="A Positive">A Positive</option>
                    <option value="A Negative">A Negative</option>
                    <option value="B Positive">B Positive</option>
                    <option value="B Negative">B Negative</option>
                    <option value="AB Positive">AB Positive</option>
                    <option value="AB Negative">AB Negative</option>
                    <option value="O Positive">O Positive</option>
                    <option value="O Negative">O Negative</option>
                  </select>
                </div>
                {/* date of birth */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date of birth</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    className="input input-bordered border-primary font-semibold"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                {/*Navigation*/}
                <div className="flex justify-between mt-5">
                  <button
                    onClick={pre}
                    className="btn btn-danger bg-red-600 text-white hover:bg-white hover:text-black hover:border-red-600"
                  >
                    <FaArrowLeft />
                    Previous
                  </button>
                  <button
                    onClick={next}
                    className="btn btn-danger bg-red-600 text-white hover:bg-white hover:text-black hover:border-red-600 "
                  >
                    Next
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            )}
            {formNo === 3 && (
              <div>
                {/*District*/}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">District</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Current District"
                    name="district"
                    className="input input-bordered input-primary font-semibold"
                    value={formData.district}
                    onChange={handleChange}
                  />
                </div>
                {/*Thana*/}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Thana</span>
                  </label>
                  <select
                    name="thana"
                    className="select select-primary w-full"
                    value={formData.thana}
                    onChange={handleChange}
                  >
                    <option>Select Thana</option>
                    <option>Ramna Model Thana</option>
                    <option>Motijheel Thana</option>
                    <option>Dhanmondi Thana</option>
                    <option>Mirpur Thana</option>
                    <option>Pallabi Thana</option>
                    <option>Kafrul Thana</option>
                  </select>
                </div>
                {/* Last of Donating blood */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last of Donation</span>
                  </label>
                  <input
                    type="date"
                    name="lastDate"
                    required
                    className="input input-bordered border-primary font-semibold"
                    value={formData.lastDate}
                    onChange={handleChange}
                  />
                  <p className="text-justify text-red-600">
                    <span>*Note: </span>If you haven't given yet, just select{" "}
                    <br />
                    minimum 3 month before from todays date{" "}
                  </p>
                </div>
                {/*Blood related problem*/}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Any issue related to donation
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-primary"
                    required
                    placeholder="Bio"
                    name="issue"
                    value={formData.issue}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/*Navigation*/}
                <div className="flex justify-between mt-5">
                  <button
                    onClick={pre}
                    className="btn btn-danger bg-red-600 text-white hover:bg-white hover:text-black hover:border-red-600"
                  >
                    <FaArrowLeft />
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger bg-green-600 text-white hover:bg-white hover:text-black hover:border-red-600 "
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className="my-4 text-center">
            Already have an account?{" "}
            <Link
              className="text-orange-600 border-orange-600 mt-5 text-bold btn hover:bg-primary hover:text-white w-full"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
