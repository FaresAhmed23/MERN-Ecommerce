import { useState } from "react";

const Login = () => {
	const [state, setState] = useState("Login");
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		email: "",
	});

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const login = async () => {
		try {
			const response = await fetch("http://localhost:4000/login", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.errors || `HTTP error! status: ${response.status}`,
				);
			}

			const responseData = await response.json();

			if (responseData.success) {
				localStorage.setItem("auth-token", responseData.token);
				window.location.replace("/");
			} else {
				console.error("Login failed:", responseData.errors);
				alert(`Login failed: ${responseData.errors}`);
			}
		} catch (error) {
			console.error(error);
			alert(`${error.message}`);
		}
	};

	const signUp = async () => {
		try {
			const response = await fetch("http://localhost:4000/signup", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.errors || `HTTP error! status: ${response.status}`,
				);
			}

			const responseData = await response.json();

			if (responseData.success) {
				localStorage.setItem("auth-token", responseData.token);
				window.location.replace("/");
			} else {
				console.error("Sign up failed:", responseData.errors);
				alert(`Sign up failed: ${responseData.errors}`);
			}
		} catch (error) {
			console.error("Fetch error:", error);
			alert(`Fetch error: ${error.message}`);
		}
	};

	return (
		<section className="max_padd_container flexCenter flex-col pt-12">
			<div className="max-w-[555px] h-[600px] bg-white m-auto px-14 py-10 rounded-md">
				<h3 className="h3">{state}</h3>
				<div className="flex flex-col gap-4 mt-7">
					{state === "Sign Up" ? (
						<input
							name="username"
							type="text"
							placeholder="Your Name"
							className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
							value={formData.username}
							onChange={changeHandler}
						/>
					) : (
						""
					)}

					<input
						type="email"
						placeholder="Email Address"
						className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
						value={formData.email}
						onChange={changeHandler}
						name="email"
					/>
					<input
						type="password"
						placeholder="Password"
						className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"
						value={formData.password}
						onChange={changeHandler}
						name="password"
					/>
				</div>
				{state === "Sign Up" ? (
					<button
						onClick={signUp}
						className="btn_dark_rounded my-5 w-full !rounded-md"
					>
						Register
					</button>
				) : (
					<button
						onClick={login}
						className="btn_dark_rounded my-5 w-full !rounded-md"
					>
						Login
					</button>
				)}
				{state === "Sign Up" ? (
					<p className="text-black font-bold">
						Already have an account?{" "}
						<span
							className="text-secondary underline cursor-pointer"
							onClick={() => setState("Login")}
						>
							Login
						</span>
					</p>
				) : (
					<p className="text-black font-bold">
						Don't have an account?{" "}
						<span
							className="text-secondary underline cursor-pointer"
							onClick={() => setState("Sign Up")}
						>
							Create One
						</span>
					</p>
				)}
				<div className="flexCenter mt-6 gap-3">
					<input type="checkbox" name="" id="" />
					<p>I agree to the Terms of use & Privacy Policy.</p>
				</div>
			</div>
		</section>
	);
};

export default Login;
