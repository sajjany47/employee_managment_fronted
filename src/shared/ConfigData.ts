export const ConfigData = {
  pageRow: [5, 10, 20, 50, 100],
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
};
