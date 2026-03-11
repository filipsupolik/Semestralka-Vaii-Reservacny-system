import React, { useState } from "react";
import { Outlet, useMatches } from "react-router-dom";
import { LoginDialog, Footer, TopBar } from "../components/index";

function LayoutPage() {
  const matches = useMatches();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const currentRoute = matches.at(-1);
  const meta = currentRoute?.handle ?? {};

  const openDialog = (type) => {
    setDialogType(type);
    setIsOpen(true);
  };
  const closeDialog = () => setIsOpen(false);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <TopBar {...meta} onOpenDialog={openDialog} />
      <div className="flex-grow">
        <Outlet />
        {dialogType === "login" && (
          <LoginDialog isOpen={isOpen} handleClose={closeDialog} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default LayoutPage;
