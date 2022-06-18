package epapoc.getuser

default allow := false

# allow is true if ALL of the body statements are true
allow {
   input.firstName == "Jennifer"
   input.lastName == "Schräder"
}