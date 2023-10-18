import React from 'react'

const Profile = () => {
    const username = localStorage.getItem('user');
    const email = localStorage.getItem('email');
    return (

        <div>
            <img src="image/Profile.jpg"
                alt="Profile"
                className='profile-image'
            ></img>



            <div className='profile-box'>

                <h3 style={{ textAlign: 'center',marginBottom:'30px',marginTop:'5px'}}>Profile</h3>
                <h5>Name
                <li>{JSON.parse(username)}</li>
                </h5>
                <h5>
                Email
                <li>{JSON.parse(email)}</li>
                </h5>
            </div>
        </div>
    )

}

export default Profile