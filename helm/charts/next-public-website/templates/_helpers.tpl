{{/*
Expand the name of the chart.
*/}}
{{- define "next-public-website.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "next-public-website.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "next-public-website.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "next-public-website.labels" -}}
client: atomix
helm.sh/chart: {{ include "next-public-website.chart" . }}
{{ include "next-public-website.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Gitlab annotations
*/}}
{{- define "next-public-website.gitlab-annotations" -}}
app.gitlab.com/app: {{ .Values.gitlab.app }}
app.gitlab.com/env: {{ .Values.gitlab.env }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "next-public-website.selectorLabels" -}}
app.kubernetes.io/name: {{ include "next-public-website.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
