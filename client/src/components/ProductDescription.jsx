import React from "react";

const ProductDescription = () => {
	return (
		<div className="mt-20">
			<div className="flex gap-3 mb-4">
				<button className="btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36">Description</button>
				<button className="btn_dark_outline !rounded-none !text-xs !py-[6px] w-36">Care Guide</button>
				<button className="btn_dark_outline !rounded-none !text-xs !py-[6px] w-36">Size Guide</button>
			</div>
            <div className="flex flex-col pb-16">
                <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati inventore totam voluptatum repellendus exercitationem, sequi quae debitis atque dignissimos minima voluptate pariatur magni quas sit iure optio ea autem nihil?</p>
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa animi nam repudiandae nulla voluptas error. Dignissimos voluptate distinctio obcaecati veniam deleniti voluptatibus dolores possimus? Error debitis quod pariatur optio ab.</p>
            </div>
		</div>
	);
};

export default ProductDescription;
