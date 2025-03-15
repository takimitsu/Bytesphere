import "./Settings.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    onAuthStateChanged,
    updateEmail,
    sendPasswordResetEmail,
} from "firebase/auth";

function Settings() {
    const [authUser, setAuthUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Bytesphere";
    }, []);

    const handlePasswordReset = async () => {
        if (!auth.currentUser) {
            setMessage("No user signed in.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, auth.currentUser.email);
            setMessage("Password reset email sent.");
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = async () => {
        if (!image) {
            setMessage("Please select an image.");
            console.log("No image selected.");
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            setMessage("No user signed in.");
            console.log("No authenticated user.");
            return;
        }

        console.log("Uploading image for user:", user.uid);
        const storageRef = ref(storage, `profilePictures/${user.uid}`);

        try {
            await uploadBytes(storageRef, image);
            console.log("Image uploaded successfully.");

            const url = await getDownloadURL(storageRef);
            console.log("Download URL:", url);

            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, { profilePicture: url });

            setMessage("Profile picture updated successfully!");
            console.log("Firestore updated with profile picture URL.");
        } catch (error) {
            setMessage(error.message);
            console.error("Upload failed:", error.message);
        }
    };

    useEffect(() => {
        const listen = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setAuthUser(user);
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    setUserData(userDocSnap.data());
                } else {
                    console.log("No such document!");
                }
            } else {
                setAuthUser(null);
                setUserData(null);
                navigate("/login");
            }
        });

        return () => {
            listen();
        };
    }, []);

    return (
        <div className="Courses">
            <Navbar userData={userData} />
            {message && <p className="mt-2 text-success">{message}</p>}
            <h3 className="text-center mt-5">Account settings</h3>
            <div className="main-container container mt-5 d-flex justify-content-center align-items-center">
                <div
                    className="card p-4"
                    style={{ maxWidth: "500px", width: "100%" }}
                >
                    <img
                        src={
                            userData?.profilePicture ||
                            "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"
                        }
                        alt="Profile"
                        className="mx-auto rounded-circle"
                        style={{ width: "100px", height: "100px" }}
                    />
                    <div className="mb-3 d-flex align-items-center justify-content-center">
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="form-control mb-2"
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleUpload}
                        >
                            Upload profile picture
                        </button>
                    </div>
                    <div className="mb-3 d-flex align-items-center justify-content-center">
                        <label className="form-label mb-0 mx-3">Password</label>
                        <button
                            className="btn btn-primary"
                            onClick={handlePasswordReset}
                        >
                            Change password
                        </button>
                    </div>
                </div>
            </div>
            <Footer userData={userData} />
        </div>
    );
}

export default Settings;
