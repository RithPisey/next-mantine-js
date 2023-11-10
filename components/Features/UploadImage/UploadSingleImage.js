"use client";
import {
  Avatar,
  Box,
  Button,
  Center,
  Group,
  Modal,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { IMAGE_MIME_TYPE, Dropzone } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { createRef, useEffect, useState } from "react";
import { Cropper } from "react-cropper";
import { useGetTranslate } from "@/hooks/useGetDictionary";

export default function UploadSingleImage({
  getFileImage = (fi) => {},
  image = null,
  isProfile = false,
}) {
  const [opened, { open, close, toggle }] = useDisclosure(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [t] = useGetTranslate();
  const handlePreviewImage = function (image) {
    setImagePreview(image);
  };
  const handleGetFileImage = function (fi) {
    setFileImage(fi);
    getFileImage(fi);
  };

  useEffect(() => {
    if (image === null) {
      handleGetFileImage(null);
      handlePreviewImage(null);
    }
  }, [image]);

  return (
    <Box w={"fit-content"}>
      <Stack>
        <Avatar
          src={imagePreview}
          w={"200px"}
          h={"200px"}
          placeholder=""
          variant={isProfile ? "transparent" : "outline"}
          radius={isProfile ? "lg" : "sm"}
        >
          {!isProfile && <IconPhoto height={"102px"} width={"102px"} />}
        </Avatar>
        <Button onClick={open}>{t("upload_image")}</Button>
      </Stack>
      <DialogUploadImage
        opened={opened}
        close={close}
        toggle={toggle}
        handlePreviewImage={handlePreviewImage}
        handleGetFileImage={handleGetFileImage}
        isProfile={isProfile}
      />
    </Box>
  );
}

function DialogUploadImage({
  opened,
  close,
  toggle,
  handlePreviewImage,
  handleGetFileImage,
  isProfile,
}) {
  const [t] = useGetTranslate();
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const cropperRef = createRef();

  const handleUploadImage = function (fi) {
    setFile(
      fi.map((fi) =>
        Object.assign(fi, {
          preview: URL.createObjectURL(fi),
        })
      )
    );
    fi.map((fi) =>
      Object.assign(fi, {
        preview: URL.createObjectURL(fi),
      })
    ).map((fi) => {
      setImageUrl(fi.preview);
    });
  };
  const handleClearImage = function () {
    setImageUrl(null);
    setFile(null);
    handlePreviewImage(null);
    handleGetFileImage(null);
  };

  const handleGetCroppedImage = function (e) {
    e.preventDefault();
    if (typeof cropperRef.current?.cropper !== "undefined") {
      urltoFile(
        cropperRef.current?.cropper.getCroppedCanvas().toDataURL(),
        Date.now(),
        "text/plain"
      ).then(function (file) {
        handleGetFileImage(file);
        handlePreviewImage(URL.createObjectURL(file));
      });
    } else {
      setCropModalOpen(false);
    }
    setImageUrl(null);
    setFile(null);
    toggle();
  };
  return (
    <Modal centered opened={opened} onClose={close} title={t("upload_image")}>
      {!file && (
        <Dropzone
          onDrop={handleUploadImage}
          maxFiles={1}
          maxSize={2 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          <Group
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(102),
                  height: rem(102),
                }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{
                  width: rem(102),
                  height: rem(102),
                }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                style={{
                  width: rem(102),
                  height: rem(102),
                }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <Box>
              <Text size="xl" inline ta={"center"}>
                Drag images here or click to select files
              </Text>
              {/* <Text size='sm' c='dimmed' ta={"center"} inline mt={7}>
							Attach as many files as you like, each file should not exceed 5mb
						</Text> */}
            </Box>
          </Group>
        </Dropzone>
      )}
      {file && (
        <Box>
          <Cropper
            ref={cropperRef}
            style={{ height: 400 }}
            initialAspectRatio={1}
            src={imageUrl ? imageUrl : null}
            viewMode={2}
            minCropBoxHeight={200}
            minCropBoxWidth={200}
            background={false}
            responsive={true}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            guides={true}
            // cropBoxResizable={false}
          />
          <Group mt={15} justify="center">
            <Button onClick={handleGetCroppedImage}> {t("crop_image")}</Button>
            <Button onClick={handleClearImage} variant="outline">
              {t("clear_image")}
            </Button>
          </Group>
        </Box>
      )}
    </Modal>
  );
}

async function urltoFile(url, filename, mimeType) {
  if (url.startsWith("data:")) {
    var arr = url.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    var file = new File([u8arr], filename, { type: mime || mimeType });
    return Promise.resolve(file);
  }
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  return new File([buf], filename, { type: mimeType });
}
