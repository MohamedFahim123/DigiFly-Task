"use client";

import { fetchUsers } from "@/app/store/slices/usersSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";

const Table = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  const validUsers = users
    .filter(
      (user) => user.FirstName && user.LastName && user.Email && user.Phone
    )
    .reverse();

  return (
    <>
      {validUsers?.length > 0 && (
        <>
          <h3 className="mb-4 text-[#6D5CBC] font-bold">{t("tableTitle")}</h3>
          <table className="w-full text-sm text-gray-500 shadow-lg overflow-x-auto">
            <thead className="text-xs font-medium text-[#999999] uppercase bg-[#F2F2F2]">
              <tr className="text-start">
                <th className="px-6 py-3">{t("tableData.firstName")}</th>
                <th className="px-6 py-3">{t("tableData.lastName")}</th>
                <th className="px-6 py-3">{t("tableData.phone")}</th>
                <th className="px-6 py-3">{t("tableData.email")}</th>
              </tr>
            </thead>
            <tbody>
              {validUsers.slice(0, 5).map((item, index) => (
                <tr
                  key={index}
                  className="border-b bg-white hover:bg-gray-100 text-[#1A1A1A]"
                >
                  <td className="px-6 py-4">{item.Email}</td>
                  <td className="px-6 py-4">{item.Phone}</td>
                  <td className="px-6 py-4">{item.FirstName}</td>
                  <td className="px-6 py-4">{item.LastName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Table;
