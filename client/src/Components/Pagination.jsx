import React from "react";
import Pagination from "@mui/material/Pagination";

const PaginationComp = () => {
	return (
		<div>
			{" "}<Pagination count={10} variant="outlined" color="primary" />
		</div>
	);
};

export default PaginationComp;
