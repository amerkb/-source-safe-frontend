import React, { useEffect, useState } from "react";
import DeletePops from "../Pops/DeletePops";
import Card from "./Card";
import { LinearProgress, Modal, Box, TextField, Button, Snackbar, Alert } from "@mui/material";
import { Helper } from "../../tools/Helper";
import { api_Routes } from "../../tools/api_Routes";

const GroupTable = () => {
  const [myGroups, setMyGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const { response } = await Helper.Get({
          url: api_Routes.Groups.myGroups,
          hasToken: true,
        });
        if (response) {
          setMyGroups(response);
        }
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleAddGroup = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setGroupName("");
  };

  const handleSaveGroup = async () => {
    if (!groupName.trim()) {
      alert("Group name is required!");
      return;
    }

    try {
      const { response } = await Helper.Post({
        url: api_Routes.Groups.add,
        hasToken: true,
        data: { groupName },
      });

      if (response) {
        setMyGroups((prevGroups) => [...prevGroups, response]);
        setSuccessMessage("Group added successfully!");
        setSnackbarOpen(true);
        handleCloseModal();
      }
    } catch (error) {
      console.error("Failed to add group:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleAddGroup}
        className="hover:bg-[#142b48] bg-primary text-center text-lg block
          duration-200 mb-4 text-white font-bold w-fit px-6 py-2 h-[calc(1.5em + .75rem + 2px)]
          text-[14px] rounded-[0.25rem] border-[1px] border-transparent"
      >
        Add Group
      </button>
      <DeletePops />
      {loading ? (
        <LinearProgress />
      ) : (
        <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
          {myGroups.map(({ id, groupName }) => (
            <Card key={id} id={id} title={groupName} />
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2 className="text-lg font-bold mb-4">Add New Group</h2>
          <TextField
            label="Group Name"
            fullWidth
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <div className="flex justify-end mt-4">
            <Button onClick={handleCloseModal} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleSaveGroup}
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "center", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

    </div>
  );
};

export default GroupTable;
