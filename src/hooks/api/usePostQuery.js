import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../services/api";
import { toast } from "react-hot-toast";
import { isArray, get, forEach, isObject, values } from "lodash";
import { useTranslation } from "react-i18next";

const postRequest = (url, attributes, config = {}) =>
  request.post(url, attributes, config);

const usePostQuery = ({
  hideSuccessToast = false,
  listKeyId = null,
  hideErrorToast = false,
}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate, isLoading, isError, error, isFetching } = useMutation(
    ({ url, attributes, config = {} }) => postRequest(url, attributes, config),
    {
      onSuccess: (data) => {
        if (!hideSuccessToast) {
          toast.success(t(data?.data?.message) || t("SUCCESS"));
        }

        if (listKeyId) {
          if (isArray(listKeyId)) {
            forEach(listKeyId, (val) => {
              queryClient.invalidateQueries(val);
            });
          } else {
            queryClient.invalidateQueries(listKeyId);
          }
        }
      },
      onError: (data) => {
        if (isArray(get(data, "response.data"))) {
          forEach(get(data, "response.data"), (val) => {
            toast.error(t(get(val, "message", "ERROR")));
          });
        } else if (isObject(get(data, "response.data"))) {
          forEach(values(get(data, "response.data")), (val) => {
            toast.error(val, { position: "top-right" });
          });
        } else {
          if (!hideErrorToast) {
            toast.error(t(data?.response?.data?.message) || t("ERROR"));
          }
        }
      },
    }
  );

  return {
    mutate,
    isLoading,
    isError,
    error,
    isFetching,
  };
};
export default usePostQuery;
