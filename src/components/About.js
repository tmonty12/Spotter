import React from "react";
import "./About.css";

export default () => {
    return (
        <div className="about-page">
                <h2>About the Creator</h2>
                <div>
                    <img src={require('../imgs/about_me.jpg')} alt="Thomas Montfort playing baseball"/>
                </div>
                <p>Thomas Montfort is the 19 year-old creator of Spotter. He is currently a Freshman at Syracuse University studying Computer Science. He enjoys playing sports including basketball, golf and baseball. He played baseball throughout high school and is now on the Syracuse club team. He began weightlifting to help with his high school baseball career but has continued to weightlift even after his competitive baseball career has ended. He has a couple years of experience with weightlifting and envisioned a platform for the weightlifting community to be able to connect in. He developed Spotter as that platform, creating a space where weightlifters can share their progress and encourage others in their journey.</p>
                <h2>About Spotter</h2>
                <p className="card-text">Spotter is in the beginning phase of its development. A user can create a profile, create a post, add other users, and interact with their posts. When creating a profile, a user can share their personal record for the bench, squat and deadlift – the three main weightlifting moves. The post functionality allows users to post a normal update picture, a personal record or exercise. Users can share specific exercises, selecting the muscles that are targeted and explain the proper movement. Spotter will eventually incorporate and exercise library that will hold all of the users exercises so that a user can search for an exercise based on the muscles they are looking to target. Spotter is also looking to incorporate a blueprint feature where users can log their workouts and create a workout plan. The workout log would help users document their weightlifting progress. The workout planning would allow users to share their plan with other users to gain inspiration. </p>
                <h2>Tutorial Video</h2>
                <video src={require('../imgs/Spotter Tutorial.mp4')} controls />
        </div>
    )
}