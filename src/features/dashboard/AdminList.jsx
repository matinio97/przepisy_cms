import React from "react";
import Stat from "./Stat";
import { RiAdminFill } from "react-icons/ri";
import styled from "styled-components";

const Box = styled.div`
	max-height: 150px;
	overflow-y: auto;
`;

const Item = styled.div`
	box-sizing: border-box;
	width: 100%;
	padding: 0.4rem;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid var(--color-grey-400);
`;

const Img = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 999px;
`;

const AdminList = ({ admins }) => {
	return (
		<>
			<Stat
				title="Lista administratorów"
				gridArea="AL"
				icon={<RiAdminFill />}
				color="red"
				maxHeight="250px">
				<Box>
					{admins?.map((user, index) => (
						<Item key={index}>
							<Img
								src={user.user_metadata.avatar}
								alt={user.user_metadata.userName}
							/>
							<p>{user.user_metadata.userName}</p>
						</Item>
					))}
				</Box>
			</Stat>
		</>
	);
};

export default AdminList;
