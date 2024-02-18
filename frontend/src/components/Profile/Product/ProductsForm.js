// antd Modules
import { Modal, Tabs, Form, Input, Row, Col } from "antd";
import TextArea from "antd/es/input/TextArea";
// React/Redux Hooks
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../redux/loaderSlice";
// react icons
import { BiErrorCircle } from "react-icons/bi";
import store from "../../../redux/store";
import Images from "./images";
import { createProduct } from "../../../redux/productSlice";

const ProductsForm = ({
  showProductForm,
  setShowProductForm,
  editForm,
  setEditForm,
  productId,
}) => {
  // Redux
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState("1");
  const [error, setError] = useState(null);

  // Checkboxes array to map them in form
  const additionalThings = [
    {
      id: 1,
      label: "Bill Available",
      name: "billAvailable",
    },
    {
      id: 2,
      label: "Warranty Available",
      name: "warrantyAvailable",
    },
    {
      id: 3,
      label: "Accessories Available",
      name: "accessoriesAvailable",
    },
    {
      id: 4,
      label: "Box Available",
      name: "boxAvailable",
    },
  ];

  // Creating rules for antd form
  const rules = [
    {
      required: true,
      message: "Required!",
    },
  ];

  // Handling Create Form
  const addProduct = async (values) => {
    try {
      dispatch(setLoader(true));
      setError(null);
      const response = await fetch("/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(values),
      });
      const json = await response.json();
      console.log(json);
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      dispatch(setLoader(false));
      setShowProductForm(false);
      dispatch(createProduct(json));
      console.log(store.getState());
    } catch (error) {
      setError(error.message);
      dispatch(setLoader(false));
    }
  };

  // Calling the PATCH Api         EDITING THE FORM
  const EditProduct = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      dispatch(setLoader(false));
      setEditForm(false);
      setShowProductForm(false);
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  // Form Ref
  const formRef = useRef(null);
  const handleOk = async (e) => {
    e.preventDefault();
    formRef.current.submit();
  };

  return (
    <div>
      {error && (
        <div className="error-backend flex border-2 border-red-500 bg-white p-2 rounded">
          <BiErrorCircle className=" text-red-500 mx-1 text-lg mt-0.5" />
          <p className="text-black">{error}</p>
        </div>
      )}
      {/* antd Modal (Form) */}
      <Modal
        title=""
        open={showProductForm}
        onCancel={() => {
          setShowProductForm(false);
          setEditForm(false);
        }}
        centered
        width="1000px"
        okText="Save"
        onOk={handleOk}
        className="shadow-none "
        {...(selectedTab === "2" && { footer: false })}
      >
        <div>
          <text-xl>{editForm ? "Edit Product" : "Add Product"}</text-xl>

          <Tabs
            defaultActiveKey="1"
            activeKey={selectedTab}
            onChange={(key) => setSelectedTab(key)}
          >
            <Tabs.TabPane tab="General" key="1">
              <Form
                layout="vertical"
                ref={formRef}
                onFinish={editForm ? EditProduct : addProduct}
                initialValues={{
                  billAvailable: false,
                  warrantyAvailable: false,
                  accessoriesAvailable: false,
                  boxAvailable: false,
                }}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={editForm ? "" : rules}
                >
                  <Input type="text" />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={editForm ? "" : rules}
                >
                  <TextArea type="text" />
                </Form.Item>
                <Row gutter={[16]}>
                  <Col span={8}>
                    <Form.Item
                      label="Price"
                      name="price"
                      rules={editForm ? "" : rules}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Category"
                      name="category"
                      rules={editForm ? "" : rules}
                    >
                      <select
                        className="w-full border-2 outline-none p-1 rounded-md"
                        rules={editForm ? "" : rules}
                      >
                        <option value="">Select</option>
                        <option value="Vehicle">Vehicle</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Home">Home</option>
                        <option value="Sports">Sports</option>
                      </select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Used (In Years)"
                      name="used"
                      rules={editForm ? "" : rules}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                </Row>
                <div className="flex gap-10 ">
                  {additionalThings.map((item) => {
                    return (
                      <Form.Item
                        label={item.label}
                        key={item.id}
                        name={item.name}
                      >
                        <Input
                          type="checkbox"
                          onChange={(e) => {
                            formRef.current.setFieldsValue({
                              [item.name]: e.target.checked,
                            });
                          }}
                          checked={formRef.current?.getFieldValue(item.name)}
                          className="w-6 h-6"
                        />
                      </Form.Item>
                    );
                  })}
                </div>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Images" key="2" disabled={!editForm}>
              <Images
                editForm={editForm}
                setShowProductForm={setShowProductForm}
                productId={productId}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsForm;
