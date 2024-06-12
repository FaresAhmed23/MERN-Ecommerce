import { MdOutlineLocalOffer } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Hero = () => {
	return (
		<section className="relative bg-hero bg-cover bg-center bg-no-repeat h-screen w-full pb-12">
			<div className="max_padd_container relative top-32 xs:top-52">
				<h1 className="h1 capitalize max-w-[37rem]">
					Digital Shopping Hub Junction
				</h1>
				<p className="text-gray-50 regular-16 mt-6 max-w-[33rem]">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero ad est
					pariatur neque, amet doloribus. Libero, eveniet cumque doloremque
					fugit quidem laborum officiis ipsam, unde excepturi ratione saepe amet
					tenetur.
				</p>
				<div className="flexStart !items-center gap-x-6 my-10">
					<div className="!regular-24 flexCenter gap-x-3">
						<FaStar />
						<FaStar />
						<FaStar />
						<FaStar />
						<FaStar />
					</div>
					<div className="bold-16 sm:bold-20">
						999k{" "}
						<span className="regular-16 sm:regular-20">Excellent Reviews</span>
					</div>
				</div>
				<div className="max-xs:flex-col flex gap-2">
					<NavLink to="" className="btn_dark_rounded flexCenter">
						Shop Now
					</NavLink>
					<NavLink to="" className="btn_dark_rounded flexCenter gap-x-2">
						<MdOutlineLocalOffer className="text-2xl" />
						Offers
					</NavLink>
				</div>
			</div>
		</section>
	);
};

export default Hero;
