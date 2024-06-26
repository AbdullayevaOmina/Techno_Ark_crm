"use client";
import { useCategoryStore } from "@store";
import { CreateCategory } from "@category-interface";
import { Button, Modal, Spinner, TextInput } from "flowbite-react";
import { ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
import { Form } from "formik";
import { schemaCatgory } from "@validations";

export function CreateCategoryModal() {
  const [openModal, setOpenModal] = useState(false);
  const { create } = useCategoryStore();

  function onCloseModal() {
    setOpenModal(false);
  }

  const initialValues: CreateCategory = {
    category_name: "",
    parent_category_id: null,
    position: null,
  };

  const handleSubmit = async (values: CreateCategory) => {
    console.log(values);
    const status = await create(values);
    if (status === 201) {
      console.log(status);
      setOpenModal(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Create Category</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white text-center">
              Create Category
            </h3>
            <Formik
              initialValues={initialValues}
              validationSchema={schemaCatgory}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="grid gap-2">
                  <Field
                    name="category_name"
                    as={TextInput}
                    placeholder="Category Name"
                    helperText={
                      <ErrorMessage
                        name="category_name"
                        component="small"
                        className="text-[red]"
                      />
                    }
                  />
                  <Field
                    name="parent_category_id"
                    type="number"
                    as={TextInput}
                    placeholder="Parent Category ID"
                    helperText={
                      <ErrorMessage
                        name="parent_category_id"
                        component="small"
                        className="text-[red]"
                      />
                    }
                  />
                  <Field
                    name="position"
                    type="number"
                    as={TextInput}
                    placeholder="Position"
                    helperText={
                      <ErrorMessage
                        name="position"
                        component="small"
                        className="text-[red]"
                      />
                    }
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Spinner aria-label="Submitting" size="md" />{" "}
                        Creating...
                      </>
                    ) : (
                      "Create"
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
