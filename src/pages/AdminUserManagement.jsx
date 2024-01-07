import React from "react";
import { useUserList } from "../features/auth/useUserList";
import Spinner from "../ui/Spinner";
import Table from "../ui/Table";
import Heading from "../ui/Heading";
import AdminUserCart from "../ui/AdminUserCart.jsx";
import styled from "styled-components";
import { useUser } from "../features/auth/useUser.js";
import Pagination from "../ui/Pagination.jsx";
import { usePreparePageParam } from "../hooks/usePreparePageParam.js";

const AdminUserManagement = () => {
	const options = [{ value: 2 }, { value: 5 }, { value: 10 }];
	const pageSizeKey = "adminUsersPageSize";

	const [pageSize, setPageSize] = usePreparePageParam(pageSizeKey, options);

	const { isLoading, users, count } = useUserList(pageSize);
	const {
		user: { id },
	} = useUser();

	if (isLoading) return <Spinner />;

	return (
		<>
			<Heading as="h3" style={{ marginBottom: "1rem" }}>
				Zarządzanie użytkownikami
			</Heading>
			<Table columns="1fr 2fr 2fr 2fr 2fr">
				<Table.Overflow>
					<Table.Header>
						<div>Zdjęcie</div>
						<div>Nazwa użytkownika</div>
						<div>Adres email</div>
						<div>Rola</div>
						<div>Akcje</div>
					</Table.Header>
					<Table.Body
						data={users}
						render={(user, index) => (
							<AdminUserCart user={user} id={id} key={index} />
						)}
					/>
				</Table.Overflow>
				<Table.Footer>
					<Pagination
						count={count}
						pageSize={pageSize}
						options={options}
						pageSizeKey={pageSizeKey}
						setPageSize={setPageSize}
					/>
				</Table.Footer>
			</Table>
		</>
	);
};

export default AdminUserManagement;
