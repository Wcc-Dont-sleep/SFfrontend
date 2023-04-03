import { FC } from 'react';
import dynamic from 'next/dynamic';


import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
  Container,
  Paper
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Text from 'src/components/Text';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';

import GraphVis from "react-graph-vis";
import { useState } from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GraphContext } from '@/contexts/GraphKnowledgeContext';

import type { LogNode } from '@/models/log';
import type { TimeSeriesNode } from '@/models/timeseries';
import type { Graph, Node, Edge } from '@/models/graph'

import { useEffect, useCallback } from 'react';
import { useRefMounted } from 'src/hooks/useRefMounted';

import { graphApi } from 'src/apis/GraphApi';
import { StartDatePickContext } from '@/contexts/StartDatePickContext';
import { EndDatePickContext } from '@/contexts/EndDatePickContext';

import { addDays } from 'date-fns';

import dayjs, { Dayjs } from 'dayjs';


const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    length: 1000
  },
  nodes: {
    color: {
      highlight: {
        border: "#f8806f"
      }
    },
    borderWidth: 3,
    borderWidthSelected: 20,
    imagePadding: {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0
    },
  }
};


const get_node_image = (label: string) => {

  const Containers = [
    '/static/images/icons/Container0.png',
  ];

  const Environments = [
    '/static/images/icons/Environment0.png'
  ];

  const Namespaces = [
    '/static/images/icons/Namespace0.png'
  ];

  const Pods = [
    '/static/images/icons/Pod0.png',
    '/static/images/icons/Pod1.png',
    '/static/images/icons/Pod2.png'
  ];

  const Services = [
    '/static/images/icons/Service0.png',
    '/static/images/icons/Service1.png'
  ];

  const Servers = [
    '/static/images/icons/Server0.png',
    '/static/images/icons/Server3.png'
  ]

  if (label.includes('Server') || label.includes('server')) {
    return Servers[Math.floor(Math.random() * (Servers.length - 1))];
  }

  if (label.includes('Container') || label.includes('container') || label.includes('Deployment') || label.includes('deployment')) {
    return Containers[Math.floor(Math.random() * (Containers.length - 1))];
  }

  if (label.includes('Environment') || label.includes('environment')) {
    return Environments[Math.floor(Math.random() * (Environments.length - 1))];
  }

  if (label.includes('Namespace') || label.includes('namespace')) {
    return Namespaces[Math.floor(Math.random() * (Namespaces.length - 1))];
  }

  if (label.includes('Service') || label.includes('service') || label.includes('Node') || label.includes('node')) {
    return Services[Math.floor(Math.random() * (Services.length - 1))];
  }


  return Pods[Math.floor(Math.random() * (Pods.length - 1))];
};


function KnowledgeGraph() {

  const [graphModel, setGraphModel] = useState<Graph>({ nodes: [], edges: [] });

  const isMountedRef = useRefMounted();

  const [current_node, setSelectedNode] = useState<Node>(null);


  const request = useCallback(async () => {
    try {

      if (isMountedRef()) {

        var response: Graph = {
          "nodes": [
            {
              "id": "tongji409-np5570m5",
              "label": "node",
              "name": "kube_node_info",
              "namespace": "", "pod_node": "", "property": "{\"kubeproxy_version\":\"v1.18.15\",\"node\":\"tongji409-np5570m5\",\"instance\":\"100.119.169.240:8443\",\"kernel_version\":\"5.4.0-91-generic\",\"__name__\":\"kube_node_info\",\"os_image\":\"Ubuntu 18.04.6 LTS\",\"kubelet_version\":\"v1.18.15\",\"container_runtime_version\":\"docker://17.12.1-ce\",\"pod_cidr\":\"100.64.0.0/24\",\"job\":\"kube-state-metrics\"}"
            },
            {
              "id": "k8s-pm-1",
              "label": "node",
              "name": "kube_node_info",
              "namespace": "", "pod_node": "", "property": "{\"kubeproxy_version\":\"v1.18.15\",\"node\":\"k8s-pm-1\",\"instance\":\"100.119.169.240:8443\",\"kernel_version\":\"4.4.0-210-generic\",\"__name__\":\"kube_node_info\",\"os_image\":\"Ubuntu 16.04.7 LTS\",\"kubelet_version\":\"v1.18.15\",\"container_runtime_version\":\"docker://19.3.12\",\"pod_cidr\":\"100.64.6.0/24\",\"job\":\"kube-state-metrics\"}"
            },
            {
              "id": "k8s-pm-2",
              "label": "node",
              "name": "kube_node_info",
              "namespace": "", "pod_node": "", "property": "{\"kubeproxy_version\":\"v1.18.15\",\"node\":\"k8s-pm-2\",\"instance\":\"100.119.169.240:8443\",\"kernel_version\":\"4.4.0-210-generic\",\"__name__\":\"kube_node_info\",\"os_image\":\"Ubuntu 16.04.7 LTS\",\"kubelet_version\":\"v1.18.15\",\"container_runtime_version\":\"docker://19.3.12\",\"pod_cidr\":\"100.64.5.0/24\",\"job\":\"kube-state-metrics\"}"
            },
            {
              "id": "k8s-pm-3",
              "label": "node",
              "name": "kube_node_info",
              "namespace": "", "pod_node": "", "property": "{\"kubeproxy_version\":\"v1.18.15\",\"node\":\"k8s-pm-3\",\"instance\":\"100.119.169.240:8443\",\"kernel_version\":\"4.4.0-210-generic\",\"__name__\":\"kube_node_info\",\"os_image\":\"Ubuntu 16.04.7 LTS\",\"kubelet_version\":\"v1.18.15\",\"container_runtime_version\":\"docker://19.3.12\",\"pod_cidr\":\"100.64.8.0/24\",\"job\":\"kube-state-metrics\"}"
            },
            {
              "id": "k8s-pm-4",
              "label": "node",
              "name": "kube_node_info",
              "namespace": "", "pod_node": "", "property": "{\"kubeproxy_version\":\"v1.18.15\",\"node\":\"k8s-pm-4\",\"instance\":\"100.119.169.240:8443\",\"kernel_version\":\"4.4.0-210-generic\",\"__name__\":\"kube_node_info\",\"os_image\":\"Ubuntu 16.04.7 LTS\",\"kubelet_version\":\"v1.18.15\",\"container_runtime_version\":\"docker://19.3.12\",\"pod_cidr\":\"100.64.7.0/24\",\"job\":\"kube-state-metrics\"}"
            },
            {
              "id": "k8s-vm-1",
              "label": "node",
              "name": "kube_node_info",
              "namespace": "", "pod_node": "", "property": "{\"kubeproxy_version\":\"v1.18.15\",\"node\":\"k8s-vm-1\",\"instance\":\"100.119.169.240:8443\",\"kernel_version\":\"4.4.0-87-generic\",\"__name__\":\"kube_node_info\",\"os_image\":\"Ubuntu 16.04.3 LTS\",\"kubelet_version\":\"v1.18.15\",\"container_runtime_version\":\"docker://19.3.12\",\"pod_cidr\":\"100.64.4.0/24\",\"job\":\"kube-state-metrics\"}"
            },
            {
              "id": "k8s-vm-2",
              "label": "node",
              "name": "kube_node_info",
              "namespace": "", "pod_node": "", "property": "{\"kubeproxy_version\":\"v1.18.15\",\"node\":\"k8s-vm-2\",\"instance\":\"100.119.169.240:8443\",\"kernel_version\":\"4.4.0-87-generic\",\"__name__\":\"kube_node_info\",\"os_image\":\"Ubuntu 16.04.3 LTS\",\"kubelet_version\":\"v1.18.15\",\"container_runtime_version\":\"docker://19.3.12\",\"pod_cidr\":\"100.64.3.0/24\",\"job\":\"kube-state-metrics\"}"
            },
            {
              "id": "k8s-vm-3",
              "label": "node",
              "name": "kube_node_info",
              "namespace": "", "pod_node": "", "property": "{\"kubeproxy_version\":\"v1.18.15\",\"node\":\"k8s-vm-3\",\"instance\":\"100.119.169.240:8443\",\"kernel_version\":\"4.4.0-87-generic\",\"__name__\":\"kube_node_info\",\"os_image\":\"Ubuntu 16.04.3 LTS\",\"kubelet_version\":\"v1.18.15\",\"container_runtime_version\":\"docker://19.3.12\",\"pod_cidr\":\"100.64.2.0/24\",\"job\":\"kube-state-metrics\"}"
            },
            {
              "id": "k8s-vm-4",
              "label": "node",
              "name": "kube_node_info",
              "namespace": "", "pod_node": "", "property": "{\"kubeproxy_version\":\"v1.18.15\",\"node\":\"k8s-vm-4\",\"instance\":\"100.119.169.240:8443\",\"kernel_version\":\"4.4.0-87-generic\",\"__name__\":\"kube_node_info\",\"os_image\":\"Ubuntu 16.04.3 LTS\",\"kubelet_version\":\"v1.18.15\",\"container_runtime_version\":\"docker://19.3.12\",\"pod_cidr\":\"100.64.1.0/24\",\"job\":\"kube-state-metrics\"}"
            },
            {
              "id": "adservice",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"hipstershop\",\"job\":\"kube-state-metrics\",\"deployment\":\"adservice\"}"
            },
            {
              "id": "adservice-2",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"hipstershop\",\"job\":\"kube-state-metrics\",\"deployment\":\"adservice-2\"}"
            },
            {
              "id": "calico-kube-controllers",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"kube-system\",\"label_k8s_app\":\"calico-kube-controllers\",\"job\":\"kube-state-metrics\",\"deployment\":\"calico-kube-controllers\"}"
            },
            {
              "id": "cartservice",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"hipstershop\",\"job\":\"kube-state-metrics\",\"deployment\":\"cartservice\"}"
            },
            {
              "id": "cartservice-2",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"hipstershop\",\"job\":\"kube-state-metrics\",\"deployment\":\"cartservice-2\"}"
            },
            {
              "id": "chaos-controller-manager",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"label_app_kubernetes_io_component\":\"controller-manager\",\"label_app_kubernetes_io_part_of\":\"chaos-mesh\",\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"chaos-testing\",\"label_app_kubernetes_io_name\":\"chaos-mesh\",\"job\":\"kube-state-metrics\",\"label_app_kubernetes_io_version\":\"2.1.4\",\"label_app_kubernetes_io_instance\":\"chaos-mesh\",\"deployment\":\"chaos-controller-manager\"}"
            },
            {
              "id": "chaos-dashboard",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"label_app_kubernetes_io_component\":\"chaos-dashboard\",\"label_app_kubernetes_io_part_of\":\"chaos-mesh\",\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"chaos-testing\",\"label_app_kubernetes_io_name\":\"chaos-mesh\",\"job\":\"kube-state-metrics\",\"label_app_kubernetes_io_version\":\"2.1.4\",\"label_app_kubernetes_io_instance\":\"chaos-mesh\",\"deployment\":\"chaos-dashboard\"}"
            },
            {
              "id": "checkoutservice",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"hipstershop\",\"job\":\"kube-state-metrics\",\"deployment\":\"checkoutservice\"}"
            },
            {
              "id": "checkoutservice-2",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"hipstershop\",\"job\":\"kube-state-metrics\",\"deployment\":\"checkoutservice-2\"}"
            },
            {
              "id": "coredns",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"kube-system\",\"label_k8s_app\":\"kube-dns\",\"job\":\"kube-state-metrics\",\"deployment\":\"coredns\"}"
            },
            {
              "id": "currencyservice",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"hipstershop\",\"job\":\"kube-state-metrics\",\"deployment\":\"currencyservice\"}"
            },
            {
              "id": "currencyservice-2",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"hipstershop\",\"job\":\"kube-state-metrics\",\"deployment\":\"currencyservice-2\"}"
            },
            {
              "id": "elasticsearch",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"efk\",\"job\":\"kube-state-metrics\",\"label_app\":\"elasticsearch\",\"deployment\":\"elasticsearch\"}"
            },
            {
              "id": "emailservice",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"hipstershop\",\"job\":\"kube-state-metrics\",\"deployment\":\"emailservice\"}"
            },
            {
              "id": "emailservice-2",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"hipstershop\",\"job\":\"kube-state-metrics\",\"deployment\":\"emailservice-2\"}"
            },
            {
              "id": "frontend",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"hipstershop\",\"job\":\"kube-state-metrics\",\"deployment\":\"frontend\"}"
            },
            {
              "id": "frontend-2",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"hipstershop\",\"job\":\"kube-state-metrics\",\"deployment\":\"frontend-2\"}"
            },
            {
              "id": "grafana",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"monitoring\",\"job\":\"kube-state-metrics\",\"label_app\":\"grafana\",\"deployment\":\"grafana\"}"
            },
            {
              "id": "istio-ingressgateway",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"label_operator_istio_io_component\":\"IngressGateways\",\"label_install_operator_istio_io_owning_resource_namespace\":\"istio-system\",\"label_install_operator_istio_io_owning_resource\":\"unknown\",\"label_release\":\"istio\",\"__name__\":\"kube_deployment_labels\",\"label_istio\":\"ingressgateway\",\"namespace\":\"istio-system\",\"label_operator_istio_io_version\":\"1.10.3\",\"job\":\"kube-state-metrics\",\"label_app\":\"istio-ingressgateway\",\"label_operator_istio_io_managed\":\"Reconcile\",\"deployment\":\"istio-ingressgateway\",\"label_istio_io_rev\":\"default\"}"
            },
            {
              "id": "istiod",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"label_operator_istio_io_component\":\"Pilot\",\"label_install_operator_istio_io_owning_resource_namespace\":\"istio-system\",\"label_install_operator_istio_io_owning_resource\":\"unknown\",\"label_release\":\"istio\",\"__name__\":\"kube_deployment_labels\",\"label_istio\":\"pilot\",\"namespace\":\"istio-system\",\"label_operator_istio_io_version\":\"1.10.3\",\"job\":\"kube-state-metrics\",\"label_app\":\"istiod\",\"label_operator_istio_io_managed\":\"Reconcile\",\"deployment\":\"istiod\",\"label_istio_io_rev\":\"default\"}"
            },
            {
              "id": "jaeger",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"label_app_kubernetes_io_component\":\"all-in-one\",\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"jaeger\",\"label_app_kubernetes_io_name\":\"jaeger\",\"job\":\"kube-state-metrics\",\"label_app\":\"jaeger\",\"deployment\":\"jaeger\"}"
            },
            {
              "id": "kibana",
              "label": "deployment",
              "name": "kube_deployment_labels",
              "namespace": "", "pod_node": "", "property": "{\"instance\":\"100.119.169.240:8443\",\"__name__\":\"kube_deployment_labels\",\"namespace\":\"efk\",\"job\":\"kube-state-metrics\",\"label_app\":\"kibana\",\"deployment\":\"kibana\"}"
            }
          ],
          "edges": [
            {
              "from_id": "adservice",
              "to_id": "checkoutservice",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice",
              "to_id": "checkoutservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice",
              "to_id": "emailservice",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice",
              "to_id": "cartservice",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice",
              "to_id": "currencyservice",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice",
              "to_id": "emailservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice",
              "to_id": "currencyservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice",
              "to_id": "adservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice",
              "to_id": "cartservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice",
              "to_id": "adservice",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice",
              "to_id": "frontend",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice-2",
              "to_id": "checkoutservice",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice-2",
              "to_id": "checkoutservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice-2",
              "to_id": "emailservice",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice-2",
              "to_id": "cartservice",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice-2",
              "to_id": "currencyservice",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice-2",
              "to_id": "emailservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice-2",
              "to_id": "currencyservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice-2",
              "to_id": "adservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice-2",
              "to_id": "cartservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice-2",
              "to_id": "adservice",
              "value": "service-deployment"
            },
            {
              "from_id": "adservice-2",
              "to_id": "frontend",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice",
              "to_id": "checkoutservice",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice",
              "to_id": "checkoutservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice",
              "to_id": "emailservice",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice",
              "to_id": "cartservice",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice",
              "to_id": "currencyservice",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice",
              "to_id": "emailservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice",
              "to_id": "currencyservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice",
              "to_id": "adservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice",
              "to_id": "cartservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice",
              "to_id": "adservice",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice",
              "to_id": "frontend",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice-2",
              "to_id": "checkoutservice",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice-2",
              "to_id": "checkoutservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice-2",
              "to_id": "emailservice",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice-2",
              "to_id": "cartservice",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice-2",
              "to_id": "currencyservice",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice-2",
              "to_id": "emailservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice-2",
              "to_id": "currencyservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice-2",
              "to_id": "adservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice-2",
              "to_id": "cartservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice-2",
              "to_id": "adservice",
              "value": "service-deployment"
            },
            {
              "from_id": "cartservice-2",
              "to_id": "frontend",
              "value": "service-deployment"
            },
            {
              "from_id": "chaos-controller-manager",
              "to_id": "chaos-dashboard",
              "value": "service-deployment"
            },
            {
              "from_id": "chaos-dashboard",
              "to_id": "chaos-dashboard",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice",
              "to_id": "checkoutservice",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice",
              "to_id": "checkoutservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice",
              "to_id": "emailservice",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice",
              "to_id": "cartservice",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice",
              "to_id": "currencyservice",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice",
              "to_id": "emailservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice",
              "to_id": "currencyservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice",
              "to_id": "adservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice",
              "to_id": "cartservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice",
              "to_id": "adservice",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice",
              "to_id": "frontend",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice-2",
              "to_id": "checkoutservice",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice-2",
              "to_id": "checkoutservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice-2",
              "to_id": "emailservice",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice-2",
              "to_id": "cartservice",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice-2",
              "to_id": "currencyservice",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice-2",
              "to_id": "emailservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice-2",
              "to_id": "currencyservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice-2",
              "to_id": "adservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice-2",
              "to_id": "cartservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice-2",
              "to_id": "adservice",
              "value": "service-deployment"
            },
            {
              "from_id": "checkoutservice-2",
              "to_id": "frontend",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice",
              "to_id": "checkoutservice",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice",
              "to_id": "checkoutservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice",
              "to_id": "emailservice",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice",
              "to_id": "cartservice",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice",
              "to_id": "currencyservice",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice",
              "to_id": "emailservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice",
              "to_id": "currencyservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice",
              "to_id": "adservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice",
              "to_id": "cartservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice",
              "to_id": "adservice",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice",
              "to_id": "frontend",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice-2",
              "to_id": "checkoutservice",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice-2",
              "to_id": "checkoutservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice-2",
              "to_id": "emailservice",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice-2",
              "to_id": "cartservice",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice-2",
              "to_id": "currencyservice",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice-2",
              "to_id": "emailservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice-2",
              "to_id": "currencyservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice-2",
              "to_id": "adservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice-2",
              "to_id": "cartservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice-2",
              "to_id": "adservice",
              "value": "service-deployment"
            },
            {
              "from_id": "currencyservice-2",
              "to_id": "frontend",
              "value": "service-deployment"
            },
            {
              "from_id": "elasticsearch",
              "to_id": "kibana",
              "value": "service-deployment"
            },
            {
              "from_id": "elasticsearch",
              "to_id": "elasticsearch",
              "value": "service-deployment"
            },
            {
              "from_id": "elasticsearch",
              "to_id": "elasticsearch",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice",
              "to_id": "checkoutservice",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice",
              "to_id": "checkoutservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice",
              "to_id": "emailservice",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice",
              "to_id": "cartservice",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice",
              "to_id": "currencyservice",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice",
              "to_id": "emailservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice",
              "to_id": "currencyservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice",
              "to_id": "adservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice",
              "to_id": "cartservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice",
              "to_id": "adservice",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice",
              "to_id": "frontend",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice-2",
              "to_id": "checkoutservice",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice-2",
              "to_id": "checkoutservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice-2",
              "to_id": "emailservice",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice-2",
              "to_id": "cartservice",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice-2",
              "to_id": "currencyservice",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice-2",
              "to_id": "emailservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice-2",
              "to_id": "currencyservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice-2",
              "to_id": "adservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice-2",
              "to_id": "cartservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice-2",
              "to_id": "adservice",
              "value": "service-deployment"
            },
            {
              "from_id": "emailservice-2",
              "to_id": "frontend",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend",
              "to_id": "checkoutservice",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend",
              "to_id": "checkoutservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend",
              "to_id": "emailservice",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend",
              "to_id": "cartservice",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend",
              "to_id": "currencyservice",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend",
              "to_id": "emailservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend",
              "to_id": "currencyservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend",
              "to_id": "adservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend",
              "to_id": "cartservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend",
              "to_id": "adservice",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend",
              "to_id": "frontend",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend-2",
              "to_id": "checkoutservice",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend-2",
              "to_id": "checkoutservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend-2",
              "to_id": "emailservice",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend-2",
              "to_id": "cartservice",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend-2",
              "to_id": "currencyservice",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend-2",
              "to_id": "emailservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend-2",
              "to_id": "currencyservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend-2",
              "to_id": "adservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend-2",
              "to_id": "cartservice-2",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend-2",
              "to_id": "adservice",
              "value": "service-deployment"
            },
            {
              "from_id": "frontend-2",
              "to_id": "frontend",
              "value": "service-deployment"
            },
            {
              "from_id": "grafana",
              "to_id": "grafana",
              "value": "service-deployment"
            },
            {
              "from_id": "istio-ingressgateway",
              "to_id": "istiod",
              "value": "service-deployment"
            },
            {
              "from_id": "istio-ingressgateway",
              "to_id": "istio-ingressgateway",
              "value": "service-deployment"
            },
            {
              "from_id": "istiod",
              "to_id": "istiod",
              "value": "service-deployment"
            },
            {
              "from_id": "istiod",
              "to_id": "istio-ingressgateway",
              "value": "service-deployment"
            },
            {
              "from_id": "jaeger",
              "to_id": "jaeger",
              "value": "service-deployment"
            },
            {
              "from_id": "kibana",
              "to_id": "kibana",
              "value": "service-deployment"
            },
            {
              "from_id": "kibana",
              "to_id": "elasticsearch",
              "value": "service-deployment"
            }
          ]
        };

        setGraphModel({
          nodes: response.nodes,
          edges: response.edges
        });

      

      }
    } catch (err) {
      console.error(err);
    }
  }, []);



  useEffect(() => {
    request();
  }, [request]);



  const graphShow = {
    graph: {
      nodes: graphModel.nodes.map((node) => {
        return {
          id: node.id,
          label: node.label + '\n' + node.name,
          image: get_node_image(node.label),
          shape: 'circularImage',
        }
      }),
      edges: graphModel.edges.map((edge) => {
        return {
          from: edge.from_id,
          to: edge.to_id,
          label: edge.value
        }
      })
    },
    events: {
      
    }
  }

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={9}>
          <Box p={4}>

            <Box>
              <Typography variant="h1" gutterBottom>
                运维实体知识图谱如下所示：
              </Typography>
              <Box height={30}> </Box>
              <Typography
                variant="h2"
                fontWeight="normal"
                color="text.secondary"
              >
                运维实体是由节点表示，运维实体之间的关系用边表示：
              </Typography>
            </Box>
          </Box>

        </Grid>
        <Grid item xs={3}>
          <Box p={4} paddingTop={13}>

          <Button variant='outlined' fullWidth>
            <Typography variant="h4">
              双击空白处添加运维节点
            </Typography>
          </Button>

          </Box>
          
          
        </Grid>
          <Grid item xs={12} md={12}>
            <Box>
              <Box>
                <Box
                  display="flex"
                  alignItems="center"
                >
                  <Container component={Paper} sx={{
                    padding: 0,
                    margin: 5,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                    borderRadius: 5,
                    border: 0,
                    boxShadow: 0,

                  }}>

                    <GraphVis width={"100%"} 
                    key={graphShow.graph.nodes.length}
                    graph={graphShow.graph} 
                    options={options} 
                    events={graphShow.events} 
                    style={{ height: "600px" }} 
                    getNetwork={(network)=>{

                      if(current_node){
                        network.selectNodes([current_node.id]);
                      }
                    }}/>

                  </Container>

                </Box>
              </Box>

              <Container component={Paper}
              sx={{
                padding: 2,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                position: 'relative',
                border: 0,
              }}>



              </Container>



            </Box>
          </Grid>
      </Grid>
    </Card>
  );
}



const RecentOrdersTable: FC = () => {

  return (
    <Card sx={{maxHeight: 800}}>
      <KnowledgeGraph />
    </Card>
  );
};

export default RecentOrdersTable;
