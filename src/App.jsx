import { useEffect, useState } from "react";

const App = () => {
  let [fullName, setFullName] = useState("");
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [gender, setGender] = useState("");
  let[loading,setLoading] = useState(false)

  let [user,setUser] = useState([]);
  let[error,setError] = useState({})

  let getData = async() => {
    setLoading(true)
    let res = await fetch("http://localhost:5000/users")

    let data = await res.json()

    console.log(data)

    setUser(data)

   setTimeout(()=>{
    setLoading(false)
   },1000)

  } 


  useEffect(()=>{
    getData()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newError = {};

    if(fullName.trim() === ""){
      newError.fullName = "FullName Required"
    }

    if(userName.trim() === "") {
      newError.userName = "UserName Required"
    }

    if(password.trim() === "") {
      newError.password = "Password Required"
    }

    if(email.trim() === "") {
      newError.email = "Email Required"
    }

    if(confirmPassword.trim() ==="") {
      newError.confirmPassword = "ConfirmPassword Required"
    }

    if(phoneNumber.trim() === "") {
      newError.phoneNumber = "PhoneNumber Required"
    }

    if(gender.trim() === "") {
      newError.gender = "Gender Required"
    }

    setError(newError)

    if(Object.keys(newError).length > 0) {
      return;
    }


    console.log({fullName,userName,email,phoneNumber, password, confirmPassword, gender});

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({fullName,userName,email,phoneNumber, password, confirmPassword, gender})
      })

      if(response.ok) {
        console.log("Submitted");
      }
    }

    catch(error) {
      console.log("Error", error);
    }
  }

  return (
    <div className="border border-black h-dvh flex items-center justify-around bg-linear-to-r from-pink-300 to-violet-300">
      <div className="bg-white">
        <h1 className="mt-3 text-center font-extrabold text-xl">
          Registration
        </h1>
        <div className="p-6">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex justify-around gap-8">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <label htmlFor="">Full Name </label>
                  <input
                    type="text"
                    placeholder="Enter your name "
                    value={fullName}
                    className="border h-8 rounded-md pl-3"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {
                    error && <small>{error.fullName}</small>
                  }
                </div>

                <div className="flex flex-col">
                  <label html="">Email </label>
                  <input
                    type="text"
                    placeholder="Enter your email "
                    value={email}
                    className="border h-8 rounded-md pl-3"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                   {
                    error && <small>{error.email}</small>
                  }
                </div>

                <div className="flex flex-col">
                  <label htmlFor="">Password</label>
                  <input
                    type="text"
                    placeholder=" Enter your password "
                    value={password}
                    className="border h-8 rounded-md pl-3"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                   {
                    error && <small>{error.password}</small>
                  }
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <label htmlFor="">Username </label>
                  <input
                    type="text"
                    placeholder="Enter your username "
                    value={userName}
                    className="border h-8 rounded-md pl-3"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  {
                    error && <small>{error.userName}</small>
                  }
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Phone Number </label>
                  <input
                    type="text"
                    placeholder="Enter your number "
                    value={phoneNumber}
                    className="border h-8 rounded-md pl-3"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {
                    error && <small>{error.phoneNumber}</small>
                  }
                </div>

                <div className="flex flex-col">
                  <label htmlFor="">Confirm Password </label>
                  <input
                    type="text"
                    placeholder="Confirm your password "
                    className="border h-8 rounded-md pl-3"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {
                    error && <small>{error.confirmPassword}</small>
                  }
                </div>
              </div>
            </div>

            <div className="mt-3">
              <h2>Gender</h2>
              <div className="flex justify-around">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Prefer not to say
                </label>
              </div>
              {
                error && <small>{error.gender}</small>
              }
            </div>

            <div className="mt-3">
              <button
                className="bg-linear-to-r from-pink-400 to-violet-400 w-full"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-2 h-[60vh] w-90 overflow-auto">
        {loading? (<h1 className="p-3 font-bold text-xl">Loading</h1>):(user.map((data)=>{ 
          return (
            <div className="border-2 m-3 p-4">
              <ul>
                <li>FullName: {data.fullName}</li>
                <li>Username: {data.userName}</li>
                <li>Email: {data.email}</li>
                <li>PhoneNumber: {data.phoneNumber}</li>
                <li>Password: {data.password}</li>
                <li>ConfirmPassword: {data.confirmPassword}</li>
                <li>Gender: {data.gender}</li>
              </ul>
            </div>
          )
        }))}
      </div>
    </div>


  );
};


export default App;
