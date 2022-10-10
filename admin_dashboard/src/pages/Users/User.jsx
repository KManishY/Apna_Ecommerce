import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../redux/action/appAction.js";
import style from "./user.module.css";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Button
} from "@chakra-ui/react";
const User = () => {
	const dispatch = useDispatch();
	const { userData } = useSelector((state) => state.userReducer);
	console.log("userData: ", userData);
	const handleOrder = (e) => {
		console.log(e);
	};

	useEffect(() => {
		dispatch(allUsers());
	}, []);
	return (
		<div>
			<div className={style.mainDiv}>
				<TableContainer align='left'>
					<Table size='sm'>
						<Thead>
							<Tr>
								<Th isNumeric>Count</Th>
								<Th>Avatar</Th>
								<Th>Name</Th>
								<Th>Email</Th>
								<Th>Phone Number</Th>
								<Th>Orders</Th>
							</Tr>
						</Thead>
						<Tbody>
							{userData &&
								userData.map((el, i) => (
									<Tr key={el._id}>
										<Td>{i + 1}</Td>
										<Td>Avatar</Td>
										<Td>{el.name}</Td>
										<Td>{el.email}</Td>
										<Td>{el.mobile}</Td>
										<Td>
											<Button
												onClick={() =>
													handleOrder(el.email)
												}
												colorScheme='teal'
											>
												Orders
											</Button>
										</Td>
									</Tr>
								))}
						</Tbody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
};

export default User;
