export const ConfigData = {
  pageRow: [10, 20, 50, 100],
  pageSize: 5,
  adminType: [
    { value: "admin", label: "Admin" },
    { value: "employee", label: "Employee" },
    { value: "hr", label: "HR" },
  ],
  HRtype: [
    // { value: "admin", label: "Admin" },
    { value: "employee", label: "Employee" },
    { value: "hr", label: "HR" },
  ],

  leaveStatus: [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ],

  registrationStatus: [
    { value: "waiting", label: "Waiting" },
    { value: "pending", label: "Pending" },
    { value: "verified", label: "Verified" },
  ],
  activeStatus: [
    { value: true, label: "Active" },
    { value: false, label: "Inactive" },
  ],
  taskStatus: [
    { value: "assign", label: "Assign" },
    { value: "todo", label: "To Do" },
    { value: "hold", label: "Hold" },
    { value: "cancelled", label: "Cancelled" },
    { value: "need-Attention", label: "Needs Attention" },
    { value: "waiting-for-review", label: "Waiting for Review" },
    { value: "under-review", label: "Under Review" },
    { value: "completed", label: "Completed" },
  ],

  senderStatus: [
    { value: "hold", label: "Hold" },
    { value: "cancelled", label: "Cancelled" },
    { value: "under-review", label: "Under Review" },
    { value: "completed", label: "Completed" },
  ],
  recieverStatus: [
    { value: "todo", label: "To Do" },
    { value: "need-Attention", label: "Needs Attention" },
    { value: "waiting-for-review", label: "Waiting for Review" },
  ],
};
